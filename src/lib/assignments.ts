import { db, storage } from "./firebase";
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  setDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { gradeAssignment } from "./gemini";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  teacherId: string;
  classId: string;
  maxPoints: number;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  attachments?: string[];
  grade?: number;
  feedback?: string;
  submittedAt: Date;
  gradedAt?: Date;
}

// Create a new assignment
export const createAssignment = async (assignment: Omit<Assignment, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "assignments"), {
      ...assignment,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

// Get an assignment by ID
export const getAssignment = async (assignmentId: string): Promise<Assignment | null> => {
  try {
    const docRef = doc(db, "assignments", assignmentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        dueDate: data.dueDate.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Assignment;
    }
    return null;
  } catch (error) {
    console.error("Error getting assignment:", error);
    throw error;
  }
};

// Get assignments for a class
export const getClassAssignments = async (classId: string): Promise<Assignment[]> => {
  try {
    const q = query(
      collection(db, "assignments"),
      where("classId", "==", classId),
      orderBy("dueDate", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dueDate: doc.data().dueDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Assignment[];
  } catch (error) {
    console.error("Error getting class assignments:", error);
    throw error;
  }
};

// Submit an assignment
export const submitAssignment = async (
  submission: Omit<AssignmentSubmission, "id" | "submittedAt">,
  files?: File[]
): Promise<string> => {
  try {
    let attachmentUrls: string[] = [];
    
    // Upload files if any
    if (files && files.length > 0) {
      attachmentUrls = await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(storage, `assignments/${submission.assignmentId}/${submission.studentId}/${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );
    }
    
    // Create submission document
    const docRef = await addDoc(collection(db, "assignment_submissions"), {
      ...submission,
      attachments: attachmentUrls,
      submittedAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error submitting assignment:", error);
    throw error;
  }
};

// Grade an assignment
export const gradeAssignmentSubmission = async (
  submissionId: string,
  grade: number,
  feedback: string
) => {
  try {
    const docRef = doc(db, "assignment_submissions", submissionId);
    await updateDoc(docRef, {
      grade,
      feedback,
      gradedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error grading assignment:", error);
    throw error;
  }
};

// Get student's submissions
export const getStudentSubmissions = async (studentId: string): Promise<AssignmentSubmission[]> => {
  try {
    const q = query(
      collection(db, "assignment_submissions"),
      where("studentId", "==", studentId),
      orderBy("submittedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt.toDate(),
      gradedAt: doc.data().gradedAt?.toDate()
    })) as AssignmentSubmission[];
  } catch (error) {
    console.error("Error getting student submissions:", error);
    throw error;
  }
};

// Get submissions for an assignment
export const getAssignmentSubmissions = async (assignmentId: string): Promise<AssignmentSubmission[]> => {
  try {
    const q = query(
      collection(db, "assignment_submissions"),
      where("assignmentId", "==", assignmentId),
      orderBy("submittedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt.toDate(),
      gradedAt: doc.data().gradedAt?.toDate()
    })) as AssignmentSubmission[];
  } catch (error) {
    console.error("Error getting assignment submissions:", error);
    throw error;
  }
};

// Auto-grade an assignment using AI
export const autoGradeAssignment = async (submissionId: string, assignmentType: string) => {
  try {
    const submissionRef = doc(db, "assignment_submissions", submissionId);
    const submissionSnap = await getDoc(submissionRef);
    
    if (!submissionSnap.exists()) {
      throw new Error("Submission not found");
    }
    
    const submission = submissionSnap.data();
    const feedback = await gradeAssignment(assignmentType, submission.content);
    
    // Parse the AI feedback to extract grade and feedback
    const gradeMatch = feedback.match(/score.*?(\d+)/i);
    const grade = gradeMatch ? parseInt(gradeMatch[1]) : null;
    
    if (grade !== null) {
      await gradeAssignmentSubmission(submissionId, grade, feedback);
      return { grade, feedback };
    }
    
    throw new Error("Could not extract grade from AI feedback");
  } catch (error) {
    console.error("Error auto-grading assignment:", error);
    throw error;
  }
}; 
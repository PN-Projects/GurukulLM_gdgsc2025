import { db } from "./firebase";
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  limit
} from "firebase/firestore";

export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: string;
  eventData: Record<string, any>;
  createdAt: Date;
}

export interface StudentProgress {
  studentId: string;
  classId: string;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  averageGrade: number;
  lastActive: Date;
}

export interface ClassAnalytics {
  classId: string;
  totalStudents: number;
  activeStudents: number;
  averageGrade: number;
  completionRate: number;
  lastUpdated: Date;
}

// Log an analytics event
export const logEvent = async (
  event: Omit<AnalyticsEvent, "id" | "createdAt">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "analytics_events"), {
      ...event,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error logging analytics event:", error);
    throw error;
  }
};

// Get user events
export const getUserEvents = async (
  userId: string,
  eventType?: string,
  limit: number = 100
): Promise<AnalyticsEvent[]> => {
  try {
    let q = query(
      collection(db, "analytics_events"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(limit)
    );
    
    if (eventType) {
      q = query(q, where("eventType", "==", eventType));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as AnalyticsEvent[];
  } catch (error) {
    console.error("Error getting user events:", error);
    throw error;
  }
};

// Track student progress
export const trackStudentProgress = async (
  studentId: string,
  classId: string,
  assignmentCompleted: boolean = false,
  grade?: number
) => {
  try {
    const docRef = doc(db, "student_progress", `${studentId}_${classId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as StudentProgress;
      const updates: Partial<StudentProgress> = {
        lastActive: new Date(),
        assignmentsCompleted: assignmentCompleted 
          ? data.assignmentsCompleted + 1 
          : data.assignmentsCompleted
      };
      
      if (grade !== undefined) {
        const totalGrade = data.averageGrade * data.assignmentsCompleted + grade;
        updates.averageGrade = totalGrade / (data.assignmentsCompleted + 1);
      }
      
      await updateDoc(docRef, updates);
    } else {
      await setDoc(docRef, {
        studentId,
        classId,
        assignmentsCompleted: assignmentCompleted ? 1 : 0,
        assignmentsTotal: 0,
        averageGrade: grade || 0,
        lastActive: new Date()
      });
    }
  } catch (error) {
    console.error("Error tracking student progress:", error);
    throw error;
  }
};

// Get student progress
export const getStudentProgress = async (
  studentId: string,
  classId: string
): Promise<StudentProgress | null> => {
  try {
    const docRef = doc(db, "student_progress", `${studentId}_${classId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        lastActive: data.lastActive.toDate()
      } as StudentProgress;
    }
    return null;
  } catch (error) {
    console.error("Error getting student progress:", error);
    throw error;
  }
};

// Update class analytics
export const updateClassAnalytics = async (classId: string) => {
  try {
    const students = await getStudentClasses(classId);
    const progressPromises = students.map(student => 
      getStudentProgress(student.id, classId)
    );
    const progressResults = await Promise.all(progressPromises);
    
    const validProgress = progressResults.filter((p): p is StudentProgress => p !== null);
    const activeStudents = validProgress.filter(p => 
      p.lastActive > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    
    const totalAssignments = validProgress.reduce((sum, p) => sum + p.assignmentsCompleted, 0);
    const totalGrades = validProgress.reduce((sum, p) => sum + p.averageGrade, 0);
    
    const analytics: ClassAnalytics = {
      classId,
      totalStudents: students.length,
      activeStudents,
      averageGrade: validProgress.length > 0 ? totalGrades / validProgress.length : 0,
      completionRate: validProgress.length > 0 ? totalAssignments / (validProgress.length * 10) : 0,
      lastUpdated: new Date()
    };
    
    await setDoc(doc(db, "class_analytics", classId), analytics);
    return analytics;
  } catch (error) {
    console.error("Error updating class analytics:", error);
    throw error;
  }
};

// Get class analytics
export const getClassAnalytics = async (
  classId: string
): Promise<ClassAnalytics | null> => {
  try {
    const docRef = doc(db, "class_analytics", classId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        lastUpdated: data.lastUpdated.toDate()
      } as ClassAnalytics;
    }
    return null;
  } catch (error) {
    console.error("Error getting class analytics:", error);
    throw error;
  }
};

// Generate analytics report
export const generateAnalyticsReport = async (
  classId: string,
  startDate: Date,
  endDate: Date
) => {
  try {
    const analytics = await getClassAnalytics(classId);
    if (!analytics) {
      throw new Error("Class analytics not found");
    }
    
    const events = await getUserEvents(classId, "assignment_submission");
    const relevantEvents = events.filter(event => 
      event.createdAt >= startDate && event.createdAt <= endDate
    );
    
    return {
      classAnalytics: analytics,
      periodEvents: relevantEvents,
      period: {
        start: startDate,
        end: endDate
      }
    };
  } catch (error) {
    console.error("Error generating analytics report:", error);
    throw error;
  }
}; 
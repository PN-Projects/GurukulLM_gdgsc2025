import { db } from "./firebase";
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
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

export interface Class {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  subject: string;
  grade: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  students: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  subject: string;
  grade: string;
  chapters: {
    id: string;
    title: string;
    content: string;
    order: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Create a new class
export const createClass = async (classData: Omit<Class, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "classes"), {
      ...classData,
      students: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};

// Get a class by ID
export const getClass = async (classId: string): Promise<Class | null> => {
  try {
    const docRef = doc(db, "classes", classId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Class;
    }
    return null;
  } catch (error) {
    console.error("Error getting class:", error);
    throw error;
  }
};

// Get classes for a teacher
export const getTeacherClasses = async (teacherId: string): Promise<Class[]> => {
  try {
    const q = query(
      collection(db, "classes"),
      where("teacherId", "==", teacherId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Class[];
  } catch (error) {
    console.error("Error getting teacher classes:", error);
    throw error;
  }
};

// Get classes for a student
export const getStudentClasses = async (studentId: string): Promise<Class[]> => {
  try {
    const q = query(
      collection(db, "classes"),
      where("students", "array-contains", studentId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Class[];
  } catch (error) {
    console.error("Error getting student classes:", error);
    throw error;
  }
};

// Add a student to a class
export const addStudentToClass = async (classId: string, studentId: string) => {
  try {
    const docRef = doc(db, "classes", classId);
    await updateDoc(docRef, {
      students: arrayUnion(studentId),
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error adding student to class:", error);
    throw error;
  }
};

// Remove a student from a class
export const removeStudentFromClass = async (classId: string, studentId: string) => {
  try {
    const docRef = doc(db, "classes", classId);
    await updateDoc(docRef, {
      students: arrayRemove(studentId),
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error removing student from class:", error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (courseData: Omit<Course, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "courses"), {
      ...courseData,
      chapters: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Get a course by ID
export const getCourse = async (courseId: string): Promise<Course | null> => {
  try {
    const docRef = doc(db, "courses", courseId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Course;
    }
    return null;
  } catch (error) {
    console.error("Error getting course:", error);
    throw error;
  }
};

// Get courses for a teacher
export const getTeacherCourses = async (teacherId: string): Promise<Course[]> => {
  try {
    const q = query(
      collection(db, "courses"),
      where("teacherId", "==", teacherId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Course[];
  } catch (error) {
    console.error("Error getting teacher courses:", error);
    throw error;
  }
};

// Add a chapter to a course
export const addChapterToCourse = async (
  courseId: string,
  chapter: Omit<Course["chapters"][0], "id">
) => {
  try {
    const docRef = doc(db, "courses", courseId);
    const course = await getCourse(courseId);
    
    if (!course) {
      throw new Error("Course not found");
    }
    
    const newChapter = {
      ...chapter,
      id: crypto.randomUUID(),
      order: course.chapters.length
    };
    
    await updateDoc(docRef, {
      chapters: [...course.chapters, newChapter],
      updatedAt: Timestamp.now()
    });
    
    return newChapter.id;
  } catch (error) {
    console.error("Error adding chapter to course:", error);
    throw error;
  }
};

// Update a chapter in a course
export const updateChapterInCourse = async (
  courseId: string,
  chapterId: string,
  updates: Partial<Course["chapters"][0]>
) => {
  try {
    const docRef = doc(db, "courses", courseId);
    const course = await getCourse(courseId);
    
    if (!course) {
      throw new Error("Course not found");
    }
    
    const updatedChapters = course.chapters.map(chapter =>
      chapter.id === chapterId ? { ...chapter, ...updates } : chapter
    );
    
    await updateDoc(docRef, {
      chapters: updatedChapters,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating chapter in course:", error);
    throw error;
  }
};

// Delete a chapter from a course
export const deleteChapterFromCourse = async (courseId: string, chapterId: string) => {
  try {
    const docRef = doc(db, "courses", courseId);
    const course = await getCourse(courseId);
    
    if (!course) {
      throw new Error("Course not found");
    }
    
    const updatedChapters = course.chapters.filter(chapter => chapter.id !== chapterId);
    
    await updateDoc(docRef, {
      chapters: updatedChapters,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error deleting chapter from course:", error);
    throw error;
  }
}; 
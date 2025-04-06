import { db, storage } from "./firebase";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  Timestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserRole } from "@/contexts/AuthContext";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL: string | null;
  bio: string;
  subjects: string[];
  grade: string;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: "light" | "dark" | "system";
  };
  createdAt: Date;
  updatedAt: Date;
}

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Create or update user profile
export const updateUserProfile = async (
  uid: string,
  profile: Partial<Omit<UserProfile, "uid" | "createdAt" | "updatedAt">>
) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Update existing profile
      await updateDoc(docRef, {
        ...profile,
        updatedAt: Timestamp.now()
      });
    } else {
      // Create new profile
      await setDoc(docRef, {
        uid,
        ...profile,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Upload profile picture
export const uploadProfilePicture = async (
  uid: string,
  file: File
): Promise<string> => {
  try {
    const storageRef = ref(storage, `users/${uid}/profile/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update user profile with new photo URL
    await updateUserProfile(uid, { photoURL: downloadURL });
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

// Update user preferences
export const updateUserPreferences = async (
  uid: string,
  preferences: Partial<UserProfile["preferences"]>
) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      "preferences": preferences,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    throw error;
  }
};

// Get user subjects
export const getUserSubjects = async (uid: string): Promise<string[]> => {
  try {
    const profile = await getUserProfile(uid);
    return profile?.subjects || [];
  } catch (error) {
    console.error("Error getting user subjects:", error);
    throw error;
  }
};

// Update user subjects
export const updateUserSubjects = async (
  uid: string,
  subjects: string[]
) => {
  try {
    await updateUserProfile(uid, { subjects });
  } catch (error) {
    console.error("Error updating user subjects:", error);
    throw error;
  }
};

// Get user grade
export const getUserGrade = async (uid: string): Promise<string | null> => {
  try {
    const profile = await getUserProfile(uid);
    return profile?.grade || null;
  } catch (error) {
    console.error("Error getting user grade:", error);
    throw error;
  }
};

// Update user grade
export const updateUserGrade = async (
  uid: string,
  grade: string
) => {
  try {
    await updateUserProfile(uid, { grade });
  } catch (error) {
    console.error("Error updating user grade:", error);
    throw error;
  }
};

// Get user bio
export const getUserBio = async (uid: string): Promise<string | null> => {
  try {
    const profile = await getUserProfile(uid);
    return profile?.bio || null;
  } catch (error) {
    console.error("Error getting user bio:", error);
    throw error;
  }
};

// Update user bio
export const updateUserBio = async (
  uid: string,
  bio: string
) => {
  try {
    await updateUserProfile(uid, { bio });
  } catch (error) {
    console.error("Error updating user bio:", error);
    throw error;
  }
}; 
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

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  link?: string;
  read: boolean;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  read: boolean;
  createdAt: Date;
}

// Create a notification
export const createNotification = async (
  notification: Omit<Notification, "id" | "createdAt" | "read">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "notifications"), {
      ...notification,
      read: false,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Get user notifications
export const getUserNotifications = async (
  userId: string,
  limit: number = 50
): Promise<Notification[]> => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as Notification[];
  } catch (error) {
    console.error("Error getting user notifications:", error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const docRef = doc(db, "notifications", notificationId);
    await updateDoc(docRef, { read: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    const notifications = await getUserNotifications(userId);
    await Promise.all(
      notifications.map(notification => markNotificationAsRead(notification.id))
    );
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

// Delete notification
export const deleteNotification = async (notificationId: string) => {
  try {
    const docRef = doc(db, "notifications", notificationId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (
  message: Omit<Message, "id" | "createdAt" | "read">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...message,
      read: false,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Get conversation between two users
export const getConversation = async (
  userId1: string,
  userId2: string,
  limit: number = 50
): Promise<Message[]> => {
  try {
    const q = query(
      collection(db, "messages"),
      where("senderId", "in", [userId1, userId2]),
      where("receiverId", "in", [userId1, userId2]),
      orderBy("createdAt", "desc"),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as Message[];
  } catch (error) {
    console.error("Error getting conversation:", error);
    throw error;
  }
};

// Get user's conversations
export const getUserConversations = async (userId: string): Promise<Message[]> => {
  try {
    const q = query(
      collection(db, "messages"),
      where("receiverId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as Message[];
  } catch (error) {
    console.error("Error getting user conversations:", error);
    throw error;
  }
};

// Mark message as read
export const markMessageAsRead = async (messageId: string) => {
  try {
    const docRef = doc(db, "messages", messageId);
    await updateDoc(docRef, { read: true });
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

// Mark all messages in a conversation as read
export const markConversationAsRead = async (
  userId1: string,
  userId2: string
) => {
  try {
    const conversation = await getConversation(userId1, userId2);
    await Promise.all(
      conversation
        .filter(message => message.receiverId === userId1 && !message.read)
        .map(message => markMessageAsRead(message.id))
    );
  } catch (error) {
    console.error("Error marking conversation as read:", error);
    throw error;
  }
};

// Delete message
export const deleteMessage = async (messageId: string) => {
  try {
    const docRef = doc(db, "messages", messageId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}; 
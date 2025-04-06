import { Timestamp } from "firebase/firestore";

export interface FirebaseTimestamp {
  toDate(): Date;
  toMillis(): number;
  seconds: number;
  nanoseconds: number;
}

export interface FirebaseDocument {
  id: string;
  [key: string]: any;
}

export interface FirebaseQueryDocumentSnapshot extends FirebaseDocument {
  data(): any;
  exists(): boolean;
}

export interface FirebaseQuerySnapshot {
  docs: FirebaseQueryDocumentSnapshot[];
  empty: boolean;
  size: number;
  forEach(callback: (result: FirebaseQueryDocumentSnapshot) => void): void;
}

export interface FirebaseCollectionReference {
  doc(id?: string): FirebaseDocumentReference;
  add(data: any): Promise<FirebaseDocumentReference>;
  where(field: string, opStr: string, value: any): FirebaseQuery;
  orderBy(field: string, direction?: "asc" | "desc"): FirebaseQuery;
  limit(limit: number): FirebaseQuery;
}

export interface FirebaseDocumentReference {
  id: string;
  get(): Promise<FirebaseQueryDocumentSnapshot>;
  set(data: any): Promise<void>;
  update(data: any): Promise<void>;
  delete(): Promise<void>;
  collection(path: string): FirebaseCollectionReference;
}

export interface FirebaseQuery {
  get(): Promise<FirebaseQuerySnapshot>;
  where(field: string, opStr: string, value: any): FirebaseQuery;
  orderBy(field: string, direction?: "asc" | "desc"): FirebaseQuery;
  limit(limit: number): FirebaseQuery;
}

export interface FirebaseStorageReference {
  put(data: any): Promise<FirebaseUploadTask>;
  getDownloadURL(): Promise<string>;
}

export interface FirebaseUploadTask {
  then(
    onFulfilled?: (snapshot: FirebaseUploadTaskSnapshot) => any,
    onRejected?: (error: any) => any
  ): Promise<any>;
  catch(onRejected: (error: any) => any): Promise<any>;
}

export interface FirebaseUploadTaskSnapshot {
  ref: FirebaseStorageReference;
  state: "running" | "paused" | "success" | "error";
  bytesTransferred: number;
  totalBytes: number;
  downloadURL?: string;
}

export interface FirebaseAuth {
  currentUser: FirebaseUser | null;
  signInWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential>;
  createUserWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential>;
  signOut(): Promise<void>;
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void;
}

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface FirebaseUserCredential {
  user: FirebaseUser;
  providerId: string | null;
  operationType: string;
}

export interface FirebaseApp {
  name: string;
  options: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
}

export interface FirebaseFirestore {
  collection(path: string): FirebaseCollectionReference;
  doc(path: string): FirebaseDocumentReference;
}

export interface FirebaseStorage {
  ref(path?: string): FirebaseStorageReference;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
} 
import firebase from 'firebase/app';

export interface MessageI {
  uid?: string | null | undefined;
  name: string | null | undefined;
  message: string;
  createdAt?: number;
  image?: string | null | undefined;

  // createdAt: firebase.firestore.FieldValue;
  // from: string | null | undefined;
  // fromName?: string;
  // message: string;
  // myMessage?: boolean;
}

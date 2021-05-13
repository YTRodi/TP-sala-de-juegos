import firebase from 'firebase';

export interface ScoreI {
  user: firebase.UserInfo | null;
  game: string;
  savedAt: Date | number;
  score?: number | string;
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { UserI } from '../../auth/pages/interfaces/user';
import { MessageI } from '../pages/chat/interfaces/message';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// TODO: ORDENAR IMPORTS!!!
// TODO: ORDENAR IMPORTS!!!
// TODO: ORDENAR IMPORTS!!!
// TODO: ORDENAR IMPORTS!!!

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesCollection: AngularFirestoreCollection<MessageI>;
  private nameCollectionDB = 'messages';

  public currentUser!: UserI | null;
  public chats: MessageI[] = [];

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.messagesCollection = afs.collection<MessageI>(
      this.nameCollectionDB,
      (ref) => ref.orderBy('createdAt', 'desc').limit(10)
    );

    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  loadAllMessages() {
    return this.messagesCollection.valueChanges().pipe(
      map((messages: MessageI[]) => {
        this.chats = [];

        for (const message of messages) {
          this.chats.unshift(message);
        }

        return this.chats;
      })
    );
  }

  async addMessage(textMessage: string) {
    try {
      // TODO: Falta uid del user
      const message: MessageI = {
        uid: this.currentUser?.uid,
        name: this.currentUser?.displayName,
        message: textMessage,
        createdAt: new Date().getTime(), // TODO: puede ser el firebase.field algo asi? asi le mando un timestamp...
        image: this.currentUser?.photoURL,
      };

      return await this.messagesCollection.add(message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

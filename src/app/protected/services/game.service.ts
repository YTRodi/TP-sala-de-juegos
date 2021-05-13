import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScoreI } from '../pages/games/interfaces/scoreI';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private scoreCollection: AngularFirestoreCollection<ScoreI>;
  private nameCollectionDB = 'scores';

  constructor(private afs: AngularFirestore) {
    this.scoreCollection = afs.collection<ScoreI>(this.nameCollectionDB);
  }

  public getAllScores(): Observable<ScoreI[]> {
    return this.afs
      .collection(this.nameCollectionDB)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ScoreI;
            const id = a.payload.doc.id;

            return { id, ...data };
          })
        )
      );
  }

  public getScoreByGameName(gameName: string) {
    console.log(gameName);

    return this.afs
      .collection<ScoreI>(
        this.nameCollectionDB,
        // (ref) => ref.orderBy('savedAt', 'desc')
        (ref) => ref.where('game', '==', gameName)
      )
      .valueChanges();
  }

  public saveScoreGame(data: ScoreI) {
    return this.scoreCollection.add(data);
  }
}

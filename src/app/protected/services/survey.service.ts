import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SurveyComponent } from '../components/survey/survey.component';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  public currentUser!: firebase.User;
  private encuestasCollection: AngularFirestoreCollection<any>;
  private nameCollectionDB = 'encuestas';

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.encuestasCollection = afs.collection<any>(this.nameCollectionDB);

    this.authService
      .getCurrentUser()
      .then((data: firebase.User) => {
        this.currentUser = data;
      })
      .catch((err) => console.error(err));
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    const dialogRef = this.dialog.open(SurveyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
    });
  }

  saveSurvey(data: any) {
    try {
      const objectToSave = {
        ...data,
        user: {
          uid: this.currentUser.uid,
          email: this.currentUser.email,
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
        },
        createdAt: new Date().getTime(),
      };

      this.encuestasCollection.add(objectToSave);
    } catch (error) {
      console.log(error);
    }
  }
}

import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GameService } from 'src/app/protected/services/game.service';

@Injectable({
  providedIn: 'root',
})
export class MemotestService {
  public currentUser: firebase.UserInfo | null = null;
  public scoresGame: any;
  public playAgain: boolean = false;

  public shuffledMemoBlocks: Array<any> = [];
  public selectedMemoblock: any = null;
  public animating: boolean = false;
  public gameOver: boolean = false;
  public interval: any;
  public timer: number = 0;
  public n: number = 0;

  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {
    this.authService
      .getCurrentUser()
      .then((data: firebase.User) => {
        this.currentUser = data.providerData[0];
      })
      .catch((err) => console.error(err));

    this.gameService
      .getScoreByGameName('memotest')
      .subscribe((scoresFiltered) => {
        this.scoresGame = scoresFiltered;
      });
  }

  public startInterval() {
    this.interval = setInterval(() => {
      this.timer = this.n;
      this.n++;
    }, 1000);
  }

  public handleMemoClick(memoBlock: any) {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...this.shuffledMemoBlocks];

    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);

    this.shuffledMemoBlocks = shuffledMemoBlocksCopy;

    if (this.selectedMemoblock === null) {
      // No hay un bloque seleccionado.
      this.selectedMemoblock = memoBlock;
    } else if (this.selectedMemoblock?.image === memoBlock.image) {
      // Seleccion correcta
      this.selectedMemoblock = null;

      this.gameOver = this.shuffledMemoBlocks.every(
        (memoblock) => memoblock.flipped
      );

      if (this.gameOver) {
        this.gameService.saveScoreGame({
          user: this.currentUser,
          savedAt: new Date().getTime(),
          game: 'memotest',
          score: this.timer,
        });
        this.playAgain = true;
        this.timer = 0;
        clearInterval(this.interval);
      }
    } else {
      // Un bloque seleccionado pero no hay coincidencia en las imagenes
      this.animating = true;
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          this.selectedMemoblock.index,
          1,
          this.selectedMemoblock
        );

        this.shuffledMemoBlocks = shuffledMemoBlocksCopy;
        this.selectedMemoblock = null;
        this.animating = false;
      }, 500);
    }
  }
}

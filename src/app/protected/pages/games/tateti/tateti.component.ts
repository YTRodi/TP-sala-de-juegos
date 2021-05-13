import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GameService } from 'src/app/protected/services/game.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css'],
})
export class TatetiComponent implements OnInit {
  public currentUser: firebase.UserInfo | null = null;
  public scoresGame: any;

  public currentPlayer: any = '';
  public typePlayers: string[] = ['X', 'O'];

  public gameActive = true;
  public CURRENT_PLAYER_TURN = () => `Turno del jugador ${this.currentPlayer}`;
  public WIN_MESSAGE = () => `El jugador ${this.currentPlayer} ha ganado!`;
  public DRAW_MESSAGE = () => `El juego ha terminado en empate!`;

  public STATUS_DISPLAY: string = this.CURRENT_PLAYER_TURN();
  public GAME_STATE: Array<string> = ['', '', '', '', '', '', '', '', ''];
  public WINNINGS: Array<number[]> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {}

  handleRestartGame() {
    this.gameActive = true;
    this.currentPlayer = '';
    this.restartGameState();
    this.handleStatusDisplay(this.CURRENT_PLAYER_TURN());
    document
      .querySelectorAll('.game-cell')
      .forEach((cell) => (cell.innerHTML = ''));
  }

  // Con esto muestro el resultado del juego actual.
  handleStatusDisplay(message: string) {
    this.STATUS_DISPLAY = message;
  }

  handleCellClick(clickedCellEvent: any) {
    const clickedCell = clickedCellEvent.target;

    if (clickedCell.classList.contains('game-cell')) {
      const htmlCollection = clickedCell.parentNode?.children;

      const clickedCellIndex = [...htmlCollection].indexOf(clickedCell);

      // Si la casilla está vacía o el juego no está activo
      if (this.GAME_STATE[clickedCellIndex] !== '' || !this.gameActive) return;

      this.handleCellPlayed(clickedCell, clickedCellIndex);
      this.handleResultValidation();
    }
  }

  handleCellPlayed(clickedCell: HTMLElement, clickedCellIndex: number) {
    this.GAME_STATE[clickedCellIndex] = this.currentPlayer;
    clickedCell.innerHTML = this.currentPlayer;
  }

  handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < this.WINNINGS.length; i++) {
      // Itera cada uno de las posibles combinaciones ganadores
      const winCondition = this.WINNINGS[i]; // Guarda la combinación por ejemplo: [0, 1, 2]
      let position1 = this.GAME_STATE[winCondition[0]],
        position2 = this.GAME_STATE[winCondition[1]],
        position3 = this.GAME_STATE[winCondition[2]]; // Almacena el valor del estado actual del juego según las posiciones de winCondition

      if (position1 === '' || position2 === '' || position3 === '') {
        continue; // Si hay algún valor vacio nadie ha ganado aún
      }
      if (position1 === position2 && position2 === position3) {
        roundWon = true; // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
        break;
      }
    }

    if (roundWon) {
      this.handleStatusDisplay(this.WIN_MESSAGE());
      this.gameService.saveScoreGame({
        user: this.currentUser,
        savedAt: new Date().getTime(),
        game: 'tateti',
        score: 1,
      });

      this.gameActive = false;
      return;
    }

    let roundDraw = !this.GAME_STATE.includes(''); // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
    if (roundDraw) {
      this.handleStatusDisplay(this.DRAW_MESSAGE());
      this.gameActive = false;
      return;
    }

    this.handlePlayerChange();
  }

  handlePlayerChange() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.handleStatusDisplay(this.CURRENT_PLAYER_TURN());
  }

  restartGameState() {
    let i = this.GAME_STATE.length;
    while (i--) {
      this.GAME_STATE[i] = '';
    }
  }

  ngOnInit(): void {
    this.authService
      .getCurrentUser()
      .then((data: firebase.User) => {
        this.currentUser = data.providerData[0];
      })
      .catch((err) => console.error(err));

    this.gameService
      .getScoreByGameName('tateti')
      .subscribe((scoresFiltered) => {
        this.scoresGame = scoresFiltered;
      });
  }
}

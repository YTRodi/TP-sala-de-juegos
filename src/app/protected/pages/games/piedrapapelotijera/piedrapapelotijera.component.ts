import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

const ROCK = 'piedra';
const PAPER = 'papel';
const SCISSORS = 'tijeras';

const TIE = 0;
const WIN = 1;
const LOST = 2;

@Component({
  selector: 'app-piedrapapelotijera',
  templateUrl: './piedrapapelotijera.component.html',
  styleUrls: ['./piedrapapelotijera.component.css'],
})
export class PiedrapapelotijeraComponent implements OnInit, AfterViewInit {
  public resultText: string | null = null;
  public baseImgUrl = '../../../../../assets/images';
  public imgRock = `${this.baseImgUrl}/piedra.svg`;
  public imgPaper = `${this.baseImgUrl}/papel.svg`;
  public imgScissors = `${this.baseImgUrl}/tijeras.svg`;

  @ViewChild('userImg') userImg: ElementRef<HTMLImageElement> | undefined;
  @ViewChild('machineImg') machineImg: ElementRef<HTMLImageElement> | undefined;

  public isPlaying: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  handleRockButton() {
    this.play(ROCK);
  }

  handlePaperButton() {
    this.play(PAPER);
  }

  handleScissorsButton() {
    this.play(SCISSORS);
  }

  play(userOption: string) {
    if (this.isPlaying) return;

    this.isPlaying = true;

    this.userImg?.nativeElement.setAttribute(
      'src',
      `../../../../../assets/images/${userOption}.svg`
    );

    this.resultText = 'La máquina está eligiendo...';

    const interval = setInterval(() => {
      const machineOption = this.calcMachineOption();

      this.machineImg?.nativeElement.setAttribute(
        'src',
        `../../../../../assets/images/${machineOption}.svg`
      );
    }, 150);

    setTimeout(() => {
      clearInterval(interval);

      const machineOption = this.calcMachineOption();
      const result = this.calcResult(userOption, machineOption);

      this.machineImg?.nativeElement.setAttribute(
        'src',
        `../../../../../assets/images/${machineOption}.svg`
      );

      switch (result) {
        case TIE:
          this.resultText = 'Empate!';
          break;

        case WIN:
          this.resultText = 'Tu ganas! 🥳';
          break;

        case LOST:
          this.resultText = 'Has perdido! 😭';
          break;
      }

      this.isPlaying = false;
    }, 2200);
  }

  calcMachineOption(): string {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
      case 0:
        return ROCK;
      case 1:
        return PAPER;
      case 2:
        return SCISSORS;

      default:
        return ROCK;
    }
  }

  calcResult(
    userOption: string,
    machineOption: string
  ): string | number | void {
    if (userOption === machineOption) {
      return TIE;
    } else if (userOption === ROCK) {
      if (machineOption === PAPER) return LOST;
      if (machineOption === SCISSORS) return WIN;
    } else if (userOption === PAPER) {
      if (machineOption === SCISSORS) return LOST;
      if (machineOption === ROCK) return WIN;
    } else if (userOption === SCISSORS) {
      if (machineOption === ROCK) return LOST;
      if (machineOption === PAPER) return WIN;
    }
  }
}

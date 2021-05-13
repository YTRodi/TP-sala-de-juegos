import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import firebase from 'firebase';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GameService } from 'src/app/protected/services/game.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css'],
})
export class SnakeComponent implements OnInit, AfterViewInit {
  @ViewChild('gameCanvas') snakeboard:
    | ElementRef<HTMLCanvasElement>
    | undefined;

  public currentUser!: firebase.User;
  public scoresGame: any;

  public snakeboard_ctx: any;
  public board_border = 'black';
  public board_background = 'white';
  public snake_col = 'lightblue';
  public snake_border = 'darkblue';
  public snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
  ];
  public changing_direction = false;
  public score = 0;
  public food_x = 0;
  public food_y = 0;

  // Horizontal velocity
  public dx = 10;
  // Vertical velocity
  public dy = 0;
  public playAgain: boolean = false;
  public clicked = false;

  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {}

  ngOnInit(): any {
    this.authService
      .getCurrentUser()
      .then((data: firebase.User) => {
        this.currentUser = data;
      })
      .catch((err) => console.error(err));

    this.gameService.getScoreByGameName('snake').subscribe((scoresFiltered) => {
      this.scoresGame = scoresFiltered;
    });
  }

  change_direction_buttons = (event: any) => {
    const keyPressed = event.target.parentElement.className;
    const goingUp = this.dy === -10;
    const goingDown = this.dy === 10;
    const goingRight = this.dx === 10;
    const goingLeft = this.dx === -10;
    if (keyPressed === 'left arr' && !goingRight) {
      this.dx = -10;
      this.dy = 0;
    }
    if (keyPressed === 'up arr' && !goingDown) {
      this.dx = 0;
      this.dy = -10;
    }
    if (keyPressed === 'right arr' && !goingLeft) {
      this.dx = 10;
      this.dy = 0;
    }
    if (keyPressed === 'down arr' && !goingUp) {
      this.dx = 0;
      this.dy = 10;
    }
  };

  ngAfterViewInit() {
    this.snakeboard_ctx = this.snakeboard?.nativeElement.getContext('2d');
    const change_direction_keyboard = (event: KeyboardEvent) => {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      // Prevent the snake from reversing
      if (this.changing_direction) return;
      this.changing_direction = true;
      const keyPressed = event.keyCode;
      const goingUp = this.dy === -10;
      const goingDown = this.dy === 10;
      const goingRight = this.dx === 10;
      const goingLeft = this.dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        this.dx = -10;
        this.dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        this.dx = 0;
        this.dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        this.dx = 10;
        this.dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        this.dx = 0;
        this.dy = 10;
      }
    };

    document.addEventListener('keydown', change_direction_keyboard);
    document.addEventListener('keydown', this.change_direction_buttons);
    this.main();
    this.gen_food();
  }

  newGame() {
    this.playAgain = false;
    this.snake = [
      { x: 200, y: 200 },
      { x: 190, y: 200 },
      { x: 180, y: 200 },
      { x: 170, y: 200 },
      { x: 160, y: 200 },
    ];

    this.main();
    this.gen_food();
  }

  main() {
    if (this.has_game_ended()) {
      this.playAgain = true;
      const objToSave = {
        user: {
          uid: this.currentUser.uid,
          email: this.currentUser.email,
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
        },
        savedAt: new Date().getTime(),
        game: 'snake',
        score: this.score,
      };
      this.gameService.saveScoreGame(objToSave);
      return;
    }

    this.changing_direction = false;
    setTimeout(() => {
      this.clear_board();
      this.drawFood();
      this.move_snake();
      this.drawSnake();
      this.main();
    }, 100);
  }

  clear_board() {
    //  Select the colour to fill the drawing
    this.snakeboard_ctx.fillStyle = this.board_background;
    //  Select the colour for the border of the canvas
    this.snakeboard_ctx.strokestyle = this.board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    this.snakeboard_ctx.fillRect(
      0,
      0,
      this.snakeboard?.nativeElement.width,
      this.snakeboard?.nativeElement.height
    );
    // Draw a "border" around the entire canvas
    this.snakeboard_ctx.strokeRect(
      0,
      0,
      this.snakeboard?.nativeElement.width,
      this.snakeboard?.nativeElement.height
    );
  }

  // Draw the snake on the canvas
  drawSnake() {
    // Draw each part
    this.snake.forEach((snakePart) => {
      this.snakeboard_ctx.fillStyle = this.snake_col;
      this.snakeboard_ctx.strokestyle = this.snake_border;
      this.snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      this.snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    });
  }

  has_game_ended() {
    for (let i = 4; i < this.snake.length; i++) {
      if (
        this.snake[i].x === this.snake[0].x &&
        this.snake[i].y === this.snake[0].y
      ) {
        return true;
      }
    }
    const hitLeftWall = this.snake[0].x < 0;
    const hitRightWall =
      this.snake[0].x > this.snakeboard!.nativeElement.width - 10;
    const hitToptWall = this.snake[0].y < 0;
    const hitBottomWall =
      this.snake[0].y > this.snakeboard!.nativeElement.height - 10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  }

  move_snake() {
    // Create the new Snake's head
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    // Add the new head to the beginning of snake body
    this.snake.unshift(head);
    const has_eaten_food =
      this.snake[0].x === this.food_x && this.snake[0].y === this.food_y;
    if (has_eaten_food) {
      // Increase score
      this.score += 10;

      this.score = this.score;

      // Generate new food location
      this.gen_food();
    } else {
      // Remove the last part of snake body
      this.snake.pop();
    }
  }

  // FOOD
  random_food(min: number, max: number) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }

  gen_food() {
    this.food_x = this.random_food(
      0,
      this.snakeboard!.nativeElement.width - 10
    );
    this.food_y = this.random_food(
      0,
      this.snakeboard!.nativeElement.height - 10
    );

    this.snake.forEach((part) => {
      const has_eaten = part.x == this.food_x && part.y == this.food_y;
      if (has_eaten) this.gen_food();
    });
  }

  drawFood() {
    this.snakeboard_ctx.fillStyle = 'lightgreen';
    this.snakeboard_ctx.strokestyle = 'darkgreen';
    this.snakeboard_ctx.fillRect(this.food_x, this.food_y, 10, 10);
    this.snakeboard_ctx.strokeRect(this.food_x, this.food_y, 10, 10);
  }

  setUP(event: any) {
    console.log(event);
  }
}

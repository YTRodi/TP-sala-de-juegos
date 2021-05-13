import { Component, OnInit } from '@angular/core';
import { MemotestService } from 'src/app/protected/services/memotest.service';
import { RickAndMortyService } from 'src/app/protected/services/rickandmorty.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css'],
})
export class MemotestComponent implements OnInit {
  public imagesList: any = [];
  public shuffleImagesList: any = [];
  public shuffleMemoBlocks: any = [];

  constructor(
    public memotestService: MemotestService,
    private pokemonService: RickAndMortyService
  ) {
    this.newGame();
  }

  ngOnInit(): void {}

  shuffleArray(a: any): Array<any> {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  newGame() {
    this.imagesList = [];
    this.pokemonService.getData().subscribe(({ results }: any) => {
      results.map((data: any, index: number) => {
        if (index < 6) {
          this.imagesList.push(data.image);
        }
      });

      this.shuffleImagesList = this.shuffleArray([
        ...this.imagesList,
        ...this.imagesList,
      ]);

      this.shuffleMemoBlocks = this.shuffleImagesList.map(
        (image: any, i: any) => ({
          index: i,
          image,
          flipped: false,
        })
      );

      this.memotestService.shuffledMemoBlocks = this.shuffleMemoBlocks;
    });
  }

  playGame() {
    this.newGame();
    this.memotestService.startInterval();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MemotestService {
  public shuffledMemoBlocks: Array<any> = [];
  public selectedMemoblock: any = null;
  public animating: boolean = false;
  public gameOver: boolean = false;

  constructor() {}

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

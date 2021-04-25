import { Component, Input, OnInit } from '@angular/core';
import { ICard } from './interface/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() listCards: ICard[];

  constructor() {
    this.listCards = [];
  }

  ngOnInit(): void {}
}

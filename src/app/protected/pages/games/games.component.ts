import { Component, OnInit } from '@angular/core';
import { ICard } from '../../components/card/interface/card';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  public listCards: ICard[] = [
    {
      title: 'Ta te ti',
      to: '/protected/games/tateti',
      image: '../../../../assets/images/tateti.png',
      alt: 'tateti image',
    },
    {
      title: 'Piedra, papel o tijeras',
      to: '/protected/games/piedrapapelotijeras',
      image: '../../../../assets/images/piedrapapelotijeras.png',
      alt: 'ppt image',
    },
    {
      title: 'Memotest',
      to: '/protected/games/memotest',
      image: '../../../../assets/images/memotest.png',
      alt: 'memotest image',
    },
    {
      title: 'Snake',
      to: '/protected/games/snake',
      image: '../../../../assets/images/snake.png',
      alt: 'snake image',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

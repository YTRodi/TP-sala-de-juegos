import { Component, OnInit } from '@angular/core';
import { Icon } from './interfaces/icon';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  public listIcons: Icon[] = [
    {
      src: '../../../../assets/icons/html.svg',
      alt: 'HTML icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/css.svg',
      alt: 'CSS icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/javaScript.svg',
      alt: 'JavaScript icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/mongoDB.svg',
      alt: 'mongoDB icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/express.svg',
      alt: 'Express icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/react.svg',
      alt: 'React icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/nodeJS.svg',
      alt: 'nodeJS icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/redux.svg',
      alt: 'Redux icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/webpack.svg',
      alt: 'Webpack icon',
      onClickFn: () => {},
    },
    {
      src: '../../../../assets/icons/angular.svg',
      alt: 'Angular icon',
      onClickFn: () => {},
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

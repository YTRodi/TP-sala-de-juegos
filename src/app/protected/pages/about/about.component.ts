import { Component, OnInit } from '@angular/core';
import { Icon } from './interfaces/icon';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  public listIcons: Icon[]  = [
    { src: '../../../../assets/icons/html.svg', alt: 'HTML icon' },
    { src: '../../../../assets/icons/css.svg', alt: 'CSS icon' },
    { src: '../../../../assets/icons/javaScript.svg', alt: 'JavaScript icon' },
    { src: '../../../../assets/icons/mongoDB.svg', alt: 'mongoDB icon' },
    { src: '../../../../assets/icons/express.svg', alt: 'Express icon' },
    { src: '../../../../assets/icons/react.svg', alt: 'React icon' },
    { src: '../../../../assets/icons/nodeJS.svg', alt: 'nodeJS icon' },
    { src: '../../../../assets/icons/redux.svg', alt: 'Redux icon' },
    { src: '../../../../assets/icons/webpack.svg', alt: 'Webpack icon' },
    { src: '../../../../assets/icons/angular.svg', alt: 'Angular icon' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

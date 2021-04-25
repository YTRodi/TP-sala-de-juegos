import { Component, OnInit } from '@angular/core';
import { ICard } from '../../components/card/interface/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public listCards: ICard[] = [
    {
      title: 'Dashboard',
      to: '/protected/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'Games',
      to: '/protected/games',
      icon: 'games',
    },
    {
      title: 'About',
      to: '/protected/about',
      icon: 'portrait',
    },
    {
      title: 'Chat',
      to: '/protected/chat',
      icon: 'chat',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

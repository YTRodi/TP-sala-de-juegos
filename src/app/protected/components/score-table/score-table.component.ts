import { Component, Input, OnInit } from '@angular/core';
import { ScoreI } from '../../pages/games/interfaces/scoreI';
import { format } from 'date-fns';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css'],
})
export class ScoreTableComponent implements OnInit {
  displayedColumns: string[] = ['game', 'score', 'userName', 'savedAt'];
  @Input() scoreList: ScoreI[] = [];

  constructor() {}

  ngOnInit(): void {}

  formatDate(dateStr: string) {
    return format(new Date(dateStr), 'EEE d, MMMM yyyy - h:m aaa');
  }
}

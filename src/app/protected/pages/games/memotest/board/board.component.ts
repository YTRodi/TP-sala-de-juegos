import { Component, OnInit } from '@angular/core';
import { MemotestService } from 'src/app/protected/services/memotest.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  constructor(public memotestService: MemotestService) {}

  ngOnInit(): void {}
}

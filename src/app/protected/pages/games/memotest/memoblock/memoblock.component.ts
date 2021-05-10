import { Component, Input, OnInit } from '@angular/core';
import { MemotestService } from 'src/app/protected/services/memotest.service';

@Component({
  selector: 'app-memoblock',
  templateUrl: './memoblock.component.html',
  styleUrls: ['./memoblock.component.css'],
})
export class MemoblockComponent implements OnInit {
  @Input() memoBlock: any;

  constructor(public memotestService: MemotestService) {}

  ngOnInit(): void {}
}

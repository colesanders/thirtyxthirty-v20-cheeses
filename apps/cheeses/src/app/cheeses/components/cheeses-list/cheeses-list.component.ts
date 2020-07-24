import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cheese } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-cheeses-list',
  templateUrl: './cheeses-list.component.html',
  styleUrls: ['./cheeses-list.component.scss']
})
export class CheesesListComponent implements OnInit {
  @Input() cheeses: [Cheese];
  @Output() selected = new EventEmitter<Cheese>();
  @Output() deleted = new EventEmitter<Cheese>();
  constructor() { }

  ngOnInit(): void {
  }

}

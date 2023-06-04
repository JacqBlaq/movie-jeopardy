import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'jeo-game-card',
  templateUrl: './jeo-game-card.component.html'
})
export class JeoGameCardComponent implements OnInit {

  @Input() isCategory: boolean = false;
  @Input() labelText!: string | number;
  @Input() isCleared: boolean = false;

  @Output() onQuestionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }



}

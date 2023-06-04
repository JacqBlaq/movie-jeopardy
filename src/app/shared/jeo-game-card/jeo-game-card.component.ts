import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'jeo-game-card',
  templateUrl: './jeo-game-card.component.html'
})
export class JeoGameCardComponent implements OnInit {

  private _isCleared: boolean = false;

  @Input() isCategory: boolean = false;
  @Input() labelText!: string | number;

  @Input() get isCleared(): boolean {
    return this._isCleared;
  }

  set isCleared(value: boolean) {
    this._isCleared = value;
  }

  @Output() onQuestionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }



}

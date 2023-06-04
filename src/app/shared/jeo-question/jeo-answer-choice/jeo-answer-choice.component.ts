import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[jeo-answer-choice]',
  templateUrl: './jeo-answer-choice.component.html',
  host: {
    '[class.is-selected]': 'isSelected'
  }
})
export class JeoAnswerComponent implements OnInit {

  private _selectedAnswer: string = '';

  @Input() labelText: string = '';
  @Input() multipleChoiceKey: string = 'A'
  @Input() showAnswer: boolean = false;
  @Input() direction: 'default' | 'reverse' = 'default';

  @Input() get selectedAnswer(): string {
    return this._selectedAnswer;
  }

  set selectedAnswer(value: string) {
    this._selectedAnswer = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  get isSelected(): boolean {
    return this.selectedAnswer === this.labelText;
  }

}

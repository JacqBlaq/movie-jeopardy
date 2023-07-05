import { Component, Input } from '@angular/core';
import { MultipleChoice } from '../../../models/question.type';

@Component({
	selector: 'button[jeo-answer-choice]',
	templateUrl: './jeo-answer-choice.component.html'
})
export class JeoAnswerComponent {
	@Input() labelText: string = '';
	@Input() multipleChoiceKey: MultipleChoice | string = 'A';
	@Input() direction: 'default' | 'reverse' = 'default';
}

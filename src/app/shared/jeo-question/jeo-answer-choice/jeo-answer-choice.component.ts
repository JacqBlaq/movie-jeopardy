import { Component, Input } from '@angular/core';

@Component({
	selector: 'button[jeo-answer-choice]',
	templateUrl: './jeo-answer-choice.component.html',
	host: {
		'[class.is-selected]': 'isSelected',
	},
})
export class JeoAnswerComponent {
	private _selectedAnswer: string = '';

	@Input() labelText: string = '';
	@Input() multipleChoiceKey: string = 'A';
	@Input() showAnswer: boolean = false;
	@Input() direction: 'default' | 'reverse' = 'default';

	/** Get the currently selected answer */
	@Input() get selectedAnswer(): string {
		return this._selectedAnswer;
	}

	/**
	 * @description
	 * Update  `selectedAnswer` on changes.
	 *
	 * @param {string} value - Updated value.
	 */
	set selectedAnswer(value: string) {
		this._selectedAnswer = value;
	}

	/**
	 * @returns {boolean} Whether current answer is selected.
	 */
	get isSelected(): boolean {
		return this.selectedAnswer === this.labelText;
	}
}

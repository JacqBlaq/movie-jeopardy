import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'jeo-game-card',
	templateUrl: './jeo-game-card.component.html',
})
export class JeoGameCardComponent {
	private _isCleared: boolean = false;

	@Input() intent: 'category' | 'question' = 'category';
	@Input() labelText!: string | number;
	@Input() get isCleared(): boolean {
		return this._isCleared;
	}

	set isCleared(value: boolean) {
		this._isCleared = value;
	}

	/** Triggers an event when a `question` card is clicked. */
	@Output() onQuestionClick = new EventEmitter<unknown>();

	/** Checks if a `question` card hasn't been viewed yet before triggering an event. */
	onCardClick(): void {
		if (!this.isCleared) {
			this.onQuestionClick.emit();
		}
	}
}

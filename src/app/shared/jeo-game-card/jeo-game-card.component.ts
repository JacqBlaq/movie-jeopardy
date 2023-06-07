import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'jeo-game-card',
	templateUrl: './jeo-game-card.component.html',
})
export class JeoGameCardComponent {
	private _isCleared: boolean = false;

	/** Intended usage of card. */
	@Input() intent: 'category' | 'question' = 'category';

	/** Text displayed on card. */
	@Input() labelText!: string | number;

	/** Whether a 'question' card has already been viewed. */
	@Input() get isCleared(): boolean {
		return this._isCleared;
	}

	/**
	 * @param {boolean} value - Updated value for 'isCleared'.
	 */
	set isCleared(value: boolean) {
		this._isCleared = value;
	}

	/** Triggers and event when a 'question' card is clicked. */
	@Output() onQuestionClick = new EventEmitter<unknown>();

	/**
	 * Checks if a 'question' card hasn't been viewed yet before triggering
	 * an event.
	 */
	onCardClick(): void {
		if (!this.isCleared) {
			this.onQuestionClick.emit();
		}
	}
}

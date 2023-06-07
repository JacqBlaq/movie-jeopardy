import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/player/player.service';
import { IQuestionModal } from 'src/app/services/question.service';

export interface IModalData extends IQuestionModal {
	modalTitle: string;
}

@Component({
	selector: 'jeo-question',
	templateUrl: './jeo-question-modal.component.html',
})
export class JeoQuestionComponent {
	question!: IModalData;
	showAnswer: boolean = false;
	showResultMessage: boolean = false;
	selectedAnswer: string = '';
	multipleChoiceKeys: string[] = ['A', 'B', 'C', 'D'];
	btnText: string = 'Submit';

	/**
	 * @param {MatDialogRef} dialogRef - Reference to modal opened.
	 * @param {IQuestionModal} data - Object passed in when modal is opened.
	 * @param {PlayerService} playerService - Player service.
	 */
	constructor(
		public dialogRef: MatDialogRef<JeoQuestionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IQuestionModal,
		private readonly playerService: PlayerService
	) {
		this.setData(data);
	}

	/**
	 * @description
	 * Updates `question` with modal title.
	 *
	 * @param {IQuestionModal} question - Object containing 'question' data.
	 */
	setData(question: IQuestionModal): void {
		this.question = {
			...question,
			modalTitle: `
				${question.categoryTitle}&nbsp;&nbsp;&nbsp;&nbsp;
				<strong>$${question.points}</strong>`,
		};
	}

	/**
	 * @returns {boolean} Whether selected answer is correct.
	 */
	get isCorrectAnswer(): boolean {
		return this.selectedAnswer === this.question.answer;
	}

	/**
	 * Sets `showAnswer` flag to `true` to highlight the correct answer.
	 */
	onShowAnswer(): void {
		this.showAnswer = true;
		this.btnText = 'Close';
	}

	/**
	 * Award points to current player if answer is correct.
	 */
	awardPoints(): void {
		if (this.isCorrectAnswer) {
			const awardedPoints = this.question.points;
			const playerIndex = this.question.activePlayer.index;
			this.playerService.onPointsAwarded(playerIndex, awardedPoints);
		}
	}

	/** Close open modal. */
	onCloseModal(): void {
		if (this.btnText === 'Close') {
			this.dialogRef.close();
		} else if (this.btnText === 'Submit') {
			this.showResultMessage = true;
			this.btnText = 'Close';

			this.awardPoints();
		}
	}
}

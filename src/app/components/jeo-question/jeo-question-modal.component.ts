import { Component, Inject } from '@angular/core';
import { Subscription, map, takeWhile, timer } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from '../../services/player/player.service';
import { JeoNotificationComponent } from '../jeo-notification/jeo-notification.component';
import { Answer, MultipleChoice, QuestionModalData } from '../../models/question.type';
import { QuestionService } from '../../services/question.service';

@Component({
	selector: 'jeo-question',
	templateUrl: './jeo-question-modal.component.html',
})
export class JeoQuestionComponent {
	private readonly _MAX_TIME_LIMIT: number = 30;

	prefix: string = '';
	answerChoices: Answer[] = [];
	showChoices: boolean = false;
	answerSubmitted: boolean = false;
	isCorrectAnswer: boolean = false;
	currrentChoice: MultipleChoice | string = '';
	timer$?: Subscription;
	timeRemaining?: number;

	/**
	 * @param dialogRef - Reference to modal opened.
	 * @param question - Data passed into modal.
	 * @param snackBar - Service that dispatches pop-up messages.
	 * @param playerService - Player service.
	 * @param questionService - Question service.
	 */
	constructor(
		public dialogRef: MatDialogRef<JeoQuestionComponent>,
		@Inject(MAT_DIALOG_DATA) public question: QuestionModalData,
		private readonly snackBar: MatSnackBar,
		private readonly playerService: PlayerService,
		private readonly questionService: QuestionService) {
		if (question.isDailyDouble) {
			this.onAnswerQuestion();
		}
	}

	/**
	 * Gets the number of players.
	 * @returns Number of players.
	 */
	get numOfPlayers(): number {
		return this.playerService.playerCount;
	}

	/** Displays answer choices once player chooses to answer question. */
	onAnswerQuestion(): void {
		this.prefix = this.questionService.getPrefix(this.question.id);
		this.answerChoices = this.questionService.getChoices(this.question.id)

		this.showChoices = true;
		this.startTimer();
	}

	/** Starts 30 seconds timer. */
	private startTimer(): void {
		this.timer$ = timer(0, 1000).pipe(
			map(sec => (this._MAX_TIME_LIMIT - sec) * 1000),
    		takeWhile(sec => sec >= 0),
		  ).subscribe((res) => {
			this.timeRemaining = res;

			if (this.timeRemaining === 0) {
				this.outOfTimeNotification();
			}
		  });
	}

	/**
	 * Gets the answer label based on the multiple-choice key.
	 * @param option - Multiple choice option.
	 * @returns Answer's label.
	 */
	private getAnswerLabel(option: MultipleChoice | string): string {
		return this.answerChoices.find(ans => ans.option === option)?.label || option;
	}

	/** Displays snackbar if user doesn't answer question before time runs out. */
	private outOfTimeNotification(): void {
		const answer = this.questionService.getAnswer(this.question.id);
		const answerLabel = this.getAnswerLabel(answer);
		const subMessage = `${this.prefix} "${this._wrapTextInSpan(answerLabel)}".`;
		const points = `-$${this.question.points.toString()}`;
		const message = `${this._wrapTextInSpan(points, 'text-tertiary-orange')} ` +
			`deducted from ${this._wrapTextInSpan(this.question.activePlayer.name)}.`;

		const notification = this.snackBar.openFromComponent(JeoNotificationComponent, {
			data: {
				titleText: 'Out of time!',
				subTitleText: 'The correct answer is...',
				subMessage: subMessage,
				message: message,
				icon: 'sentiment_very_dissatisfied',
				actionBtnText: 'close',
				customClass: 'error'
			}
		});

		notification.onAction().subscribe(() => {
			this.dialogRef.close();
		});
	}

	/** Pass turn to next player. */
	onPassToNext(): void {
		this.playerService.nextPlayersTurn(this.question.activePlayer.id);
		this.question.activePlayer = this.playerService.getActivePlayerById();
	}

	/** Submit selected answer. */
	submitAnswer(): void {
		this.answerSubmitted = true;
		this.timer$?.unsubscribe();

		this.isCorrectAnswer = this.questionService.isCorrectAnswer(this.question.id, this.currrentChoice);

		this._awardPoints();
		this._resultsNotification();
	}

	/** Award or deduct points to current player. */
	private _awardPoints(): void {
		const points = this.isCorrectAnswer ? this.question.points : -this.question.points;
		const id = this.question.activePlayer.id;
		this.playerService.onPointsAwarded(id, points);
	}

	/** Displays snackbar letting user know whether they answered correctly. */
	private _resultsNotification(): void {
		const answer = this.questionService.getAnswer(this.question.id);
		const answerLabel = this.getAnswerLabel(answer);
		const title = this.isCorrectAnswer ? 'Awesome, you got it!' : 'Sorry, wrong answer!';
		const subMessage = `${this.prefix || ''} "${this._wrapTextInSpan(answerLabel)}".`;
		const points = `${this.isCorrectAnswer ? '$' + this.question.points.toString() : '-$' +
			this.question.points.toString()}`;
		const message = `${this._wrapTextInSpan(points, 'text-tertiary-orange')} ` +
			`${this.isCorrectAnswer ? 'awarded to' : 'deducted from'} ` +
			`${this._wrapTextInSpan(this.question.activePlayer.name)}.`;
		const icon = this.isCorrectAnswer ? 'celebration' : 'sentiment_very_dissatisfied';
		const customClass = this.isCorrectAnswer ? '' : 'error';

		const notification = this.snackBar.openFromComponent(JeoNotificationComponent, {
			data: {
				titleText: title,
				subTitleText: 'The correct answer is...',
				subMessage: subMessage,
				message: message,
				icon: icon,
				actionBtnText: 'close',
				customClass: customClass
			}
		});

		notification.onAction().subscribe(() => {
			this.dialogRef.close();
		});
	}

	/**
	 * Wrap text in html tag.
	 * @param innerText - Text to wrap arount html tag.
	 * @param className - Class name.
	 * @returns Text wrapped in span tag.
	 */
	private _wrapTextInSpan(innerText: string, className = 'jeo-mark-text'): string {
		return `<span class="${className}">${innerText}</span>`
	}

	trackByFn(index: number, item: Answer): number {
		return index;
	}
}

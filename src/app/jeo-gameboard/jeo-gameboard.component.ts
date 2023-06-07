import { Component } from '@angular/core';
import { IPlayer, PlayerService } from '../services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { JeoQuestionComponent } from '../shared/jeo-question/jeo-question-modal.component';
import {
	ICategory,
	IQuestion,
	IQuestionModal,
	QuestionService,
} from '../services/question.service';

@Component({
	selector: 'jeo-gameboard',
	templateUrl: './jeo-gameboard.component.html',
})
export class JeoGameboardComponent {

	/**
	 * @param {MatDialog} dialog - Service to open Material Design modal dialogs.
	 * @param {PlayerService} playerService  - Player service.
	 * @param {QuestionService} questionService - Question service.
	 */
	constructor(
		public dialog: MatDialog,
		private readonly playerService: PlayerService,
		private readonly questionService: QuestionService
	) {}

	/**
	 * @description
	 * Get list of categories and questions.
	 *
	 * @returns {ICategory[]} List of questions.
	 */
	get categoryQuestions(): ICategory[] {
		return this.questionService.getQuestions();
	}

	/**
	 * @description
	 * Get list of players.
	 *
	 * @returns {IPlayer[]} List of players.
	 */
	get players(): IPlayer[] {
		return this.playerService.getPlayerSettings();
	}

	/**
	 * @description
	 * Get the 'id' of the player whose turn it is currently.
	 *
	 * @returns {number} Active player's `id`.
	 */
	get activePlayerId(): number {
		return this.playerService.getActivePlayerId();
	}

	/**
	 * @description
	 * Reset scores to $0 for each player.
	 */
	restartGame(): void {
		this.playerService.resetPlayerScores();
		this.questionService.resetQuestions();
	}

	/**
	 * @description
	 * Exit the game.
	 */
	exitGame(): void {
		this.playerService.onGameExit();
		this.questionService.resetQuestions();
	}

	/**
	 * @description
	 * Opens a modal displaying category question with answer options.
	 *
	 * @param {IQuestion} question - Category question card clicked.
	 * @param {ICategory} cat - Category question belongs to.
	 */
	onQuestionClick(question: IQuestion, cat: ICategory): void {
		question.isCleared = true;

		const activePlayer = this.playerService.getActivePlayerById();
		const modalData: IQuestionModal = {
			categoryTitle: cat.title,
			points: question.points,
			question: question.question,
			answer: question.answer,
			answerChoices: question.answerChoices,
			activePlayer: activePlayer,
		};

		// Open question modal
		this.dialog
			.open(JeoQuestionComponent, {
				width: '750px',
				height: '610px',
				data: modalData,
			})
			.afterClosed()
			.subscribe(() => {
				this.playerService.nextPlayersTurn(activePlayer.index);
			});
	}
}

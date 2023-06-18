import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { JeoQuestionComponent } from '../../shared/jeo-question/jeo-question-modal.component';
import { QuestionService } from '../../services/question.service';
import { JeoDailyDoubleModalComponent } from 'src/app/shared/jeo-daily-double-modal/jeo-daily-double-modal.component';
import { CategoryBase, QuestionBase, QuestionModalData } from 'src/app/models/question.type';
import { GameboardService } from 'src/app/services/gameboard.service';
import { Player } from 'src/app/models/player.type';

@Component({
	selector: 'jeo-gameboard',
	templateUrl: './jeo-gameboard.component.html',
})
export class JeoGameboardComponent implements OnInit {

	/**
	 * @param {MatDialog} dialog - Service to open Material Design modal dialogs.
	 * @param {PlayerService} playerService  - Player service.
	 * @param {QuestionService} questionService - Question service.
	 */
	constructor(
		public dialog: MatDialog,
		private readonly playerService: PlayerService,
		private readonly questionService: QuestionService) {}

	/** */
	ngOnInit(): void {
		this.questionService.setDailyDoubles();
	}

	/**
	 * Get the categories to display on gameboard.
	 * @returns {CategoryBase[]} Game categories.
	 */
	get categories(): CategoryBase[] {
		return GameboardService.boardCategories();
	}

	/**
	 * Get the categories respective questions.
	 * @param {number} id - The `id` of the category.
	 * @returns {QuestionBase[]} Category's respective questions.
	 */
	getCategoryQuestions(id: number): QuestionBase[] {
		return this.questionService.getCategoryQuestions(id);
	}









	/**
	 * @description
	 * Get list of players.
	 *
	 * @returns {Player[]} List of players.
	 */
	get players(): Player[] {
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
		this.playerService.resetPlayers();
		this.questionService.resetQuestions();
	}

	/**
	 * @description
	 * Opens a modal displaying category question with answer options.
	 *
	 * @param {QuestionBase} question - Category question card clicked.
	 * @param {CategoryBase} cat - Category question belongs to.
	 */
	onQuestionClick(question: QuestionBase, cat: CategoryBase): void {
		this.questionService.markQuestionCleared(question.id, cat.id);

		const isDailyDouble = this.questionService.isDailyDouble(question.id);
		const activePlayer = this.playerService.getActivePlayerById();
		const questionLabel = this.questionService.getQuestionLabel(question.id);
		const categoryLabel = cat.label;
		const points = question.points;

		const modalData: QuestionModalData = {
			id: question.id,
			points: points,
			label: questionLabel ?? '',
			activePlayer: activePlayer,
			category: {
				id: cat.id,
				label: cat.label
			}
		};

		if (isDailyDouble) {
			modalData.isDailyDouble = true;

			this.dialog.open(JeoDailyDoubleModalComponent, {
				width: '750px',
				data: {
					activePlayer: activePlayer,
					categoryLabel: categoryLabel,
				}
			})
			.afterClosed()
			.subscribe((result: { wagerAmount: number }) => {
				modalData.points = result.wagerAmount;
				this.openQuestionModal(modalData);
			});
		} else {
			this.openQuestionModal(modalData);
		}
	}

	/**
	 * Opens up the Question modal.
	 *
	 * @param {QuestionModalData} data - Data passed into modal component.
	 * @param {IActivePlayer} activePlayer - Active player.
	 * @param {Category} cat - Question's Category.
	 */
	openQuestionModal(data: QuestionModalData): void {
		this.dialog.open(JeoQuestionComponent, {
			width: '750px',
			data: data,
		})
		.afterClosed()
		.subscribe(() => {
			this.questionService.markCategoryCleared(data.category.id);

			if (this.questionService.allCategoriesCleared()) {
				this.annouceWinner();
				return;
			}

			this.playerService.nextPlayersTurn(data.activePlayer.id);
		});
	}

	/**
	 * @description
	 * Open modal to show winner.
	 */
	annouceWinner(): void {
		// this.dialog.open(JeoWinnerModalComponent, {
		// 	width: '750px',
		// 	height: '610px',
		// 	data: this.players,
		// });
	}
}

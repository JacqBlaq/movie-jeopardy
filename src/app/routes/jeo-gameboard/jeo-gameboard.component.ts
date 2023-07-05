import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { JeoQuestionComponent } from '../../components/jeo-question/jeo-question-modal.component';
import { QuestionService } from '../../services/question.service';
import { JeoDailyDoubleModalComponent } from 'src/app/components/jeo-daily-double-modal/jeo-daily-double-modal.component';
import { CategoryBase, QuestionBase, QuestionModalData } from 'src/app/models/question.type';
import { GameboardService } from 'src/app/services/gameboard.service';
import { Player } from 'src/app/models/player.type';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
	selector: 'jeo-gameboard',
	templateUrl: './jeo-gameboard.component.html',
})
export class JeoGameboardComponent implements OnInit, OnDestroy {
	previousUrl?: string;
	categories: CategoryBase[] = [];
	players: Player[] = [];
	players$?: Observable<Player[]>;

	subscription$: Subject<any> = new Subject<any>();

	/**
	 * @param dialog - Service to open Material Design modal dialogs.
	 * @param router - Router service.
	 * @param utils - Utility service.
	 * @param playerService  - Player service.
	 * @param questionService - Question service.
	 */
	constructor(
		public dialog: MatDialog,
		private readonly router: Router,
		private readonly utils: UtilsService,
		private readonly playerService: PlayerService,
		private readonly questionService: QuestionService) {
		this.previousUrl = this.router?.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
	}

	ngOnInit(): void {
		this._checkBrowserRefresh();
		this.players$ = this.playerService.players$;
		this.categories = GameboardService.boardCategories();
	}

	/**
	 * Checks whether the browser refreshed or not.
	 *
	 * This can be used to ensure that the "Daily Double" questions and the `players` array
	 * don't reset everytime the page refreshes.
	 */
	private _checkBrowserRefresh(): void {
		this.utils.browserRefreshed$
			.pipe(takeUntil(this.subscription$))
			.subscribe((refreshed: boolean) => {
				if (refreshed) {
					this.playerService.getLocallyStoredPlayers();
					this.restartGame();
				} else {
					this.questionService.setDailyDoubles();
				}
		});
	}

	/**
	 * Get category's list of questions.
	 * @param id - Category `id`.
	 * @returns An array of questions.
	 */
	getCategoryQuestions(id: number): Observable<QuestionBase[]> {
		return this.questionService.getCategoryQuestions$(id);
	}

	/**
	 * Get the 'id' of the player whose turn it is currently.
	 * @returns Active player's `id`.
	 */
	get activePlayerId(): number {
		return this.playerService.getActivePlayerId();
	}

	/** Reset scores to $0 for each player. */
	restartGame(): void {
		this.playerService.resetPlayerScores();
		this.questionService.resetQuestions();
	}

	/** Exit the game. */
	exitGame(): void {
		this.playerService.resetPlayers();
		this.questionService.resetQuestions();
	}

	/**
	 * Opens a modal displaying category question with answer options.
	 * @param question - Category question card clicked.
	 * @param cat - Category question belongs to.
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
				label: cat.label,
			},
		};

		if (isDailyDouble) {
			modalData.isDailyDouble = true;

			this.dialog
				.open(JeoDailyDoubleModalComponent, {
					width: '750px',
					data: {
						activePlayer: activePlayer,
						categoryLabel: categoryLabel,
					},
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
	 * @param data - Data passed into modal.
	 */
	openQuestionModal(data: QuestionModalData): void {
		this.dialog
			.open(JeoQuestionComponent, {
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

	annouceWinner(): void {}

	trackByPlayerFn(index: number, item: Player): number {
		return index || item.id;
	}

	trackByCategoryFn(index: number, item: CategoryBase): number {
		return index || item.id;
	}

	trackByQuestionFn(index: number, item: QuestionBase): number {
		return index || item.id;
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}
}

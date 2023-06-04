import { Component, OnInit } from '@angular/core';
import { IPlayer, PlayersService } from '../services/players.service';
import { GameboardService} from '../services/gameboard.service';
import { MatDialog } from '@angular/material/dialog';
import { IQuestionResult, JeoQuestionComponent } from '../shared/jeo-question/jeo-question.component';
import { ICategory, IQuestion, IQuestionModal, QuestionService } from '../services/question.service';
import { IConfirmModalData, JeoConfirmModalComponent } from '../shared/jeo-confirm-modal/jeo-confirm-modal.component';

@Component({
  selector: 'jeo-gameboard',
  templateUrl: './jeo-gameboard.component.html'
})
export class JeoGameboardComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    private playersService: PlayersService,
    private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  /**
   * Get list of categories and questions.
   * @type {ICategory[]}
   */
  get categoryQuestions(): ICategory[] {
    return this.questionService.getQuestions();
  }

  /**
   * Get list of players.
   * @type {IPlayer[]}
   */
  get players(): IPlayer[] {
    return this.playersService.getPlayerSettings();
  }

  /**
   * Get the 'id' of the player whose turn it is currently.
   * @type {number}
   */
  get activePlayerId(): number {
    return this.playersService.getActivePlayerId();
  }

  /**
   * Reset scores to $0 for each player.
   */
  resetScores(): void {
    this.playersService.onScoresReset();
  }

  /**
   * Exit the game.
   */
  exitGame(): void {
    this.playersService.onGameExit();
    this.questionService.onGameExit();
  }

  /**
   * Opens a modal displaying category question with answer options.
   *
   * @param {IQuestion} question - Category question card clicked.
   * @param {ICategory} cat - Category question belongs to.
   */
  onQuestionClick(question: IQuestion, cat: ICategory): void {
    question.isCleared = true;

    if (cat.questions.every(c => c.isCleared)) {
      cat.isCleared = true;
    }

    const activePlayer = this.playersService.getActivePlayerById();
    const modalData: IQuestionModal = {
      categoryTitle: cat.title,
      points: question.points,
      question: question.question,
      answer: question.answer,
      answerChoices: question.answerChoices,
      activePlayer: activePlayer
    };

    const dialogRef = this.dialog.open(JeoQuestionComponent, {
      width: '750px',
      data: modalData,
    });

    dialogRef.afterClosed().subscribe((result: IQuestionResult) => {
      if (result.isCorrectAnswer) {
        this.playersService.onScoreIncrease(activePlayer.index, question.points);
      }

      const settings: IConfirmModalData = {
        headerText: result.isCorrectAnswer ? 'Correct Answer' : 'Incorrect Answer',
        message: `${(result.isCorrectAnswer ? '$' + question.points : 'No')} points awarded to ${activePlayer.name}.`,
        btnTheme: 'dark',
        headerTheme: result.isCorrectAnswer? 'warning' : 'danger'
      };

      const dialogRef = this.dialog.open(JeoConfirmModalComponent, {
        width: '530px',
        data: settings,
      });

    });

  }
}

import { Injectable } from '@angular/core';
import { IActivePlayer, IPlayer } from './players.service';
import categoryJson from '../../assets/data/game-questions.json';

export interface IQuestion {
  question: string;
  points: number;
  answer: string;
  answerChoices: string[];
  isCleared: boolean;
}

export interface ICategory {
  title: string;
  isCleared: boolean;
  questions: IQuestion[];
}

export interface IQuestionModal {
  categoryTitle: string;
  points: number;
  question: string;
  answer: string;
  answerChoices: string[];
  activePlayer: IActivePlayer;
}


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  categories: ICategory[] = categoryJson;

  constructor() { }

  getQuestions(): ICategory[] {
    return this.categories;
  }

  /**
   * Reset 'isCleared' property in each category and question.
   */
  onGameExit(): void {
    this.categories.forEach(c => {
      c.isCleared = false;
      c.questions.forEach(q => {
        q.isCleared = false;
      });
    });
  }

}

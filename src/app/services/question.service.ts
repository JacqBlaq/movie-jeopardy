import { Injectable } from '@angular/core';
import { IActivePlayer } from './player/player.service';
import categoryJson from '../../assets/data/game-questions.json';

export type IQuestion = {
  question: string;
  points: number;
  answer: string;
  answerChoices: string[];
  isCleared: boolean;
}

export type ICategory = {
  title: string;
  questions: IQuestion[];
}

export type IQuestionModal = {
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
  private categories: ICategory[] = categoryJson;

  /**
   * Get list of all questions.
   *
   * @returns {ICategory[]} List of all questions.
   */
  getQuestions(): ICategory[] {
    return this.categories;
  }

  /**
   * Reset 'isCleared' property in each category and question.
   */
  resetQuestions(): void {
    this.categories.forEach(cat => {
      cat.questions.forEach(ques => {
        ques.isCleared = false;
      });
    });
  }
}

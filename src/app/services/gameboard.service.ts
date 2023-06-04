import { Injectable } from '@angular/core';
import categoryJson from '../data/game-questions.json';

export interface IQuestion {
  question: string;
  points: number;
  answer: string;
  options: string[];
}

export interface ICategory {
  category: string;
  questions: IQuestion[];
}


@Injectable({
  providedIn: 'root'
})
export class GameboardService {

  categories: ICategory[] = categoryJson;

  constructor() { }

  getGameQuestions(): ICategory[] {
    return this.categories;
  }
}

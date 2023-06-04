import { Injectable } from '@angular/core';
import categoryJson from '../data/game-questions.json';

export interface IQuestion {
  question: string;
  points: number;
  answer: string;
  options: string[];
  isCleared: boolean;
}

export interface ICategory {
  title: string;
  isCleared: boolean;
  questions: IQuestion[];
}


@Injectable({
  providedIn: 'root'
})
export class GameboardService {

  categories: ICategory[] = categoryJson;

  constructor() { }

  getQuestions(): ICategory[] {
    return this.categories;
  }
}

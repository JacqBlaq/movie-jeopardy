import { Injectable } from '@angular/core';
import { IActivePlayer, IPlayer } from './players.service';


export interface IQuestionModal {
  categoryTitle: string;
  points: number;
  question: string;
  answer: string;
  options: string[];
  activePlayer: IActivePlayer;
}


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }
}

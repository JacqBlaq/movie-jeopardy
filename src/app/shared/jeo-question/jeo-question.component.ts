import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayersService } from 'src/app/services/players.service';
import { IQuestionModal } from 'src/app/services/question.service';

export interface IModalData extends IQuestionModal {
  modalTitle: string;
}

export interface IQuestionResult {
  isCorrectAnswer: boolean
}

@Component({
  selector: 'jeo-question',
  templateUrl: './jeo-question.component.html'
})
export class JeoQuestionComponent {

  question!: IModalData;
  showAnswer: boolean = false;
  selectedAnswer: string = '';
  multipleChoiceKeys: string[] = ['A', 'B', 'C', 'D'];

  constructor(
    public dialogRef: MatDialogRef<JeoQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestionModal,
    private playersService: PlayersService) {
      this.setData(data);
  }

  setData(data: IQuestionModal): void {
    this.question = {
      ...data,
      modalTitle: `
        ${data.categoryTitle}&nbsp;&nbsp;&nbsp;&nbsp;<strong>$${data.points}</strong>`
    };
  }

  onAnswerSelection(answer: string): void {
    this.selectedAnswer = answer;
  }

  onCloseModal(): void {
    if (this.showAnswer)
      this.dialogRef.close();
    else {
      const result = {
        isCorrectAnswer: this.selectedAnswer === this.question.answer
      };
      this.dialogRef.close(result);
    }

  }
}

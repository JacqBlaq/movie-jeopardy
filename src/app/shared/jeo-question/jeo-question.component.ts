import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayersService } from 'src/app/services/players.service';
import { IQuestionModal } from 'src/app/services/question.service';

export interface IModalData extends IQuestionModal {
  modalTitle: string;
}

@Component({
  selector: 'jeo-question',
  templateUrl: './jeo-question.component.html'
})
export class JeoQuestionComponent implements OnInit {

  question!: IModalData;

  constructor(
    public dialogRef: MatDialogRef<JeoQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestionModal,
    private playersService: PlayersService) {
      this.question = {
        ...data,
        modalTitle: `
          ${data.categoryTitle}&nbsp;&nbsp;&nbsp;&nbsp;<strong>$${data.points}</strong>`
      };
    }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.dialogRef.close();
  }

}

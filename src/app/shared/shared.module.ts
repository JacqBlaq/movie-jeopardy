import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeoContainerComponent } from './jeo-container/jeo-container.component';
import { JeoHeaderComponent } from './jeo-header/jeo-header.component';
import { JeoButtonComponent } from './jeo-button/jeo-button.component';
import { JeoContainerSlabComponent } from './jeo-container-slab/jeo-container-slab.component';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JeoAddPlayersComponent } from './jeo-add-players/jeo-add-players.component';
import { JeoGameCardComponent } from './jeo-game-card/jeo-game-card.component';
import { JeoQuestionComponent } from './jeo-question/jeo-question.component';
import { JeoGamePlayerCardComponent } from './jeo-game-player-card/jeo-game-player-card.component';
import { JeoAnswerComponent } from './jeo-question/jeo-answer/jeo-answer.component';


@NgModule({
  declarations: [
    JeoContainerComponent,
    JeoHeaderComponent,
    JeoButtonComponent,
    JeoContainerSlabComponent,
    JeoAddPlayersComponent,
    JeoGameCardComponent,
    JeoQuestionComponent,
    JeoGamePlayerCardComponent,
    JeoAnswerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    JeoContainerComponent,
    JeoContainerSlabComponent,
    JeoHeaderComponent,
    JeoButtonComponent,
    JeoAddPlayersComponent,
    JeoGamePlayerCardComponent,
    JeoGameCardComponent,
    JeoQuestionComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        disableClose: true,
        maxWidth: 750,
        hasBackdrop: true
      } as MatDialogConfig,
    }
  ]
})
export class SharedModule { }

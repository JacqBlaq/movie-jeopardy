import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeoContainerComponent } from './jeo-container/jeo-container.component';
import { JeoHeaderComponent } from './jeo-header/jeo-header.component';
import { JeoButtonComponent } from './jeo-button/jeo-button.component';
import { JeoContainerSlabComponent } from './jeo-container-slab/jeo-container-slab.component';
import { MatIconModule } from '@angular/material/icon';
import {
	MAT_TOOLTIP_DEFAULT_OPTIONS,
	MatTooltipModule,
} from '@angular/material/tooltip';
import {
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatDialogConfig,
	MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JeoAddPlayersComponent } from './jeo-add-players/jeo-add-players.component';
import { JeoGameCardComponent } from './jeo-game-card/jeo-game-card.component';
import { JeoQuestionComponent } from './jeo-question/jeo-question-modal.component';
import { JeoGamePlayerCardComponent } from './jeo-game-player-card/jeo-game-player-card.component';
import { JeoAnswerComponent } from './jeo-question/jeo-answer-choice/jeo-answer-choice.component';
import { JeoAlertModalComponent } from './jeo-alert-modal/jeo-alert-modal.component';
import { JeoWinnerModalComponent } from './jeo-winner-modal/jeo-winner-modal.component';

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
		JeoAnswerComponent,
		JeoAlertModalComponent,
		JeoWinnerModalComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		MatIconModule,
		MatDialogModule,
		MatTooltipModule,
	],
	exports: [
		JeoContainerComponent,
		JeoContainerSlabComponent,
		JeoHeaderComponent,
		JeoButtonComponent,
		JeoAddPlayersComponent,
		JeoGamePlayerCardComponent,
		JeoGameCardComponent,
		JeoQuestionComponent,
		JeoAlertModalComponent,
		JeoWinnerModalComponent,
	],
	providers: [
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				disableClose: true,
				maxWidth: 750,
				hasBackdrop: true,
				closeOnNavigation: true,
			} as MatDialogConfig,
		},
		{
			provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
			useValue: {
				position: 'above',
			},
		},
	],
})
export class SharedModule {}

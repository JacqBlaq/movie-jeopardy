import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeoContainerComponent } from './jeo-container/jeo-container.component';
import { JeoHeaderComponent } from './jeo-container/jeo-header/jeo-header.component';
import { JeoButtonComponent } from './jeo-button/jeo-button.component';
import { JeoContainerSlabComponent } from './jeo-container/jeo-container-slab/jeo-container-slab.component';
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
import { MatSliderModule } from '@angular/material/slider';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JeoAddPlayersComponent } from './jeo-add-players/jeo-add-players.component';
import { JeoGameCardComponent } from './jeo-game-card/jeo-game-card.component';
import { JeoQuestionComponent } from './jeo-question/jeo-question-modal.component';
import { JeoGamePlayerCardComponent } from './jeo-game-player-card/jeo-game-player-card.component';
import { JeoAnswerComponent } from './jeo-question/jeo-answer-choice/jeo-answer-choice.component';
import { JeoWinnerModalComponent } from './jeo-winner-modal/jeo-winner-modal.component';
import { JeoSlabHeaderComponent } from './jeo-container/jeo-slab-header/jeo-slab-header.component';
import { JeoNotificationComponent } from './jeo-notification/jeo-notification.component';
import { JeoDailyDoubleModalComponent } from './jeo-daily-double-modal/jeo-daily-double-modal.component';

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
		JeoWinnerModalComponent,
  		JeoSlabHeaderComponent,
    	JeoNotificationComponent,
     JeoDailyDoubleModalComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		MatIconModule,
		MatDialogModule,
		MatTooltipModule,
		MatSliderModule,
		MatSnackBarModule,
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
		JeoWinnerModalComponent,
		JeoSlabHeaderComponent,
		JeoNotificationComponent,
		JeoDailyDoubleModalComponent,
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
		{
			provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
			useValue: {
				panelClass: 'custom-snack-bar',
				horizontalPosition: 'center',
				verticalPosition: 'top'
			}
		},
	],
})
export class SharedModule {}

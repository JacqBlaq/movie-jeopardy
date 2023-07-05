import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { JeoContainerComponent } from './jeo-container/jeo-container.component';
import { JeoHeaderComponent } from './jeo-container/jeo-header/jeo-header.component';
import { JeoButtonComponent } from './jeo-button/jeo-button.component';
import { JeoContainerSlabComponent } from './jeo-container/jeo-container-slab/jeo-container-slab.component';
import { JeoGameCardComponent } from './jeo-game-card/jeo-game-card.component';
import { JeoQuestionComponent } from './jeo-question/jeo-question-modal.component';
import { JeoGamePlayerCardComponent } from './jeo-player-card/jeo-player-card.component';
import { JeoAnswerComponent } from './jeo-question/jeo-answer-choice/jeo-answer-choice.component';
import { JeoWinnerModalComponent } from './jeo-winner-modal/jeo-winner-modal.component';
import { JeoSlabHeaderComponent } from './jeo-container/jeo-slab-header/jeo-slab-header.component';
import { JeoNotificationComponent } from './jeo-notification/jeo-notification.component';
import { JeoDailyDoubleModalComponent } from './jeo-daily-double-modal/jeo-daily-double-modal.component';
import { JeoAvatarComponent } from './jeo-avatar/jeo-avatar.component';
import { JeoLeaderboardTileComponent } from './jeo-leaderboard-tile/jeo-leaderboard-tile.component';
import { JeoLeaderboardContentComponent } from './jeo-leaderboard-tile/jeo-leaderboard-content/jeo-leaderboard-content.component';
import { JeoAvatarActionsComponent } from './jeo-avatar/jeo-avatar-actions/jeo-avatar-actions.component';
import { JeoIconComponent } from './jeo-icon/jeo-icon.component';

@NgModule({
	declarations: [
		JeoContainerComponent,
		JeoHeaderComponent,
		JeoButtonComponent,
		JeoContainerSlabComponent,
		JeoGameCardComponent,
		JeoQuestionComponent,
		JeoGamePlayerCardComponent,
		JeoAnswerComponent,
		JeoWinnerModalComponent,
  		JeoSlabHeaderComponent,
    	JeoNotificationComponent,
		JeoDailyDoubleModalComponent,
		JeoAvatarComponent,
		JeoLeaderboardTileComponent,
		JeoLeaderboardContentComponent,
  		JeoAvatarActionsComponent,
    	JeoIconComponent,
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
		JeoGamePlayerCardComponent,
		JeoGameCardComponent,
		JeoQuestionComponent,
		JeoWinnerModalComponent,
		JeoSlabHeaderComponent,
		JeoNotificationComponent,
		JeoDailyDoubleModalComponent,
		JeoAvatarComponent,
		JeoLeaderboardTileComponent,
		JeoLeaderboardContentComponent,
		JeoAvatarActionsComponent,
		JeoIconComponent
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

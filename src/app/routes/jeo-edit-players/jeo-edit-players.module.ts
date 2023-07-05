import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JeoEditPlayersRoutingModule } from './jeo-edit-players-routing.module';
import { JeoEditPlayersComponent } from './jeo-edit-players.component';
import { SharedModule } from '../../components/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [JeoEditPlayersComponent],
	imports: [
		CommonModule,
		FormsModule,
		JeoEditPlayersRoutingModule,
		SharedModule,
		MatIconModule,
		MatTooltipModule
	],
})
export class JeoEditPlayersModule {}

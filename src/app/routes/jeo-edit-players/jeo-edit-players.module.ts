import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JeoEditPlayersRoutingModule } from './jeo-edit-players-routing.module';
import { JeoEditPlayersComponent } from './jeo-edit-players.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [JeoEditPlayersComponent],
	imports: [CommonModule, JeoEditPlayersRoutingModule, SharedModule],
})
export class JeoEditPlayersModule {}

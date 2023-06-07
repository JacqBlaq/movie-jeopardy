import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JeoGameboardRoutingModule } from './jeo-gameboard-routing.module';
import { JeoGameboardComponent } from './jeo-gameboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [JeoGameboardComponent],
	imports: [CommonModule, JeoGameboardRoutingModule, SharedModule],
})
export class JeoGameboardModule {}

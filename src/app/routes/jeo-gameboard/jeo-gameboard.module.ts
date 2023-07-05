import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JeoGameboardRoutingModule } from './jeo-gameboard-routing.module';
import { JeoGameboardComponent } from './jeo-gameboard.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
	declarations: [JeoGameboardComponent],
	imports: [CommonModule, JeoGameboardRoutingModule, SharedModule],
})
export class JeoGameboardModule {}

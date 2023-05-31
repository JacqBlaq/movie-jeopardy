import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JeoHomePageRoutingModule } from './jeo-home-page-routing.module';
import { JeoHomePageComponent } from './jeo-home-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JeoHomePageComponent
  ],
  imports: [
    CommonModule,
    JeoHomePageRoutingModule,
    SharedModule
  ],
  exports: [
    JeoHomePageComponent
  ]
})
export class JeoHomePageModule { }

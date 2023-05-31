import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeoContainerComponent } from './jeo-container/jeo-container.component';
import { JeoHeaderComponent } from './jeo-header/jeo-header.component';
import { JeoButtonComponent } from './jeo-button/jeo-button.component';
import { JeoContainerSlabComponent } from './jeo-container-slab/jeo-container-slab.component';
import { JeoAddPlayerCardComponent } from './jeo-add-player-card/jeo-add-player-card.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    JeoContainerComponent,
    JeoHeaderComponent,
    JeoButtonComponent,
    JeoContainerSlabComponent,
    JeoAddPlayerCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    JeoContainerComponent,
    JeoContainerSlabComponent,
    JeoHeaderComponent,
    JeoButtonComponent,
    JeoAddPlayerCardComponent,
  ]
})
export class SharedModule { }

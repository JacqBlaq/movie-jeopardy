import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeoContainerComponent } from './jeo-container/jeo-container.component';
import { JeoHeaderComponent } from './jeo-header/jeo-header.component';
import { JeoButtonComponent } from './jeo-button/jeo-button.component';
import { JeoContainerSlabComponent } from './jeo-container-slab/jeo-container-slab.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JeoPlayersComponent } from './jeo-players/jeo-players.component';
import { JeoGamePlayersComponent } from './jeo-game-players/jeo-game-players.component';


@NgModule({
  declarations: [
    JeoContainerComponent,
    JeoHeaderComponent,
    JeoButtonComponent,
    JeoContainerSlabComponent,
    JeoPlayersComponent,
    JeoGamePlayersComponent
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
    JeoPlayersComponent,
    JeoGamePlayersComponent
  ]
})
export class SharedModule { }

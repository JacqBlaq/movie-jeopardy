import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JeoEditPlayersComponent } from './jeo-edit-players.component';

const routes: Routes = [{ path: '', component: JeoEditPlayersComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class JeoEditPlayersRoutingModule {}

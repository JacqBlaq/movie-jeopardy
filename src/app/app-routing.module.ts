import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./routes/jeo-home-page/jeo-home-page.module').then(
				(mod) => mod.JeoHomePageModule
			),
	},
	{
		path: 'gameboard',
		loadChildren: () =>
			import('./routes/jeo-gameboard/jeo-gameboard.module').then(
				(mod) => mod.JeoGameboardModule
			),
	},
	{
		path: 'edit-players',
		loadChildren: () =>
			import('./routes/jeo-edit-players/jeo-edit-players.module').then(
				(mod) => mod.JeoEditPlayersModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

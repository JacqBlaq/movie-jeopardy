import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./jeo-home-page/jeo-home-page.module').then(
				(mod) => mod.JeoHomePageModule
			),
	},
	{
		path: 'gameboard',
		loadChildren: () =>
			import('./jeo-gameboard/jeo-gameboard.module').then(
				(mod) => mod.JeoGameboardModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

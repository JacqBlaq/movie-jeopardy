import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./jeo-home-page/jeo-home-page.module').then(m => m.JeoHomePageModule)
  },
  {
    path: 'gameboard',
    loadChildren: () => import('./jeo-gameboard/jeo-gameboard.module').then(m => m.JeoGameboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

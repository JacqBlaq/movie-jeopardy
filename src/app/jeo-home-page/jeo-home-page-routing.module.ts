import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JeoHomePageComponent } from './jeo-home-page.component';

const routes: Routes = [
    { path: '', component: JeoHomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JeoHomePageRoutingModule { }

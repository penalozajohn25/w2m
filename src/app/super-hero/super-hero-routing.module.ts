import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHeroComponent } from './list-hero/list-hero.component';

const routes: Routes = [
  {
    path: 'heros',
    component: ListHeroComponent,
  },
  { path: '', redirectTo: 'heros', pathMatch: 'full' },
  { path: '**', redirectTo: 'heros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroRoutingModule { }

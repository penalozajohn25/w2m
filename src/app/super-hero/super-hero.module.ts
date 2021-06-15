import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { ListHeroComponent } from './list-hero/list-hero.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { DeleteHeroModalComponent } from './components/delete-hero-modal/delete-hero-modal.component';
import { MaterialModule } from '../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ListHeroComponent,
    EditHeroComponent,
    DeleteHeroModalComponent
  ],
  imports: [
    CommonModule,
    SuperHeroRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents : [
    EditHeroComponent
  ]
})
export class SuperHeroModule { }

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  @Output() onAdd = new EventEmitter<any>(true);

  heroForm!: FormGroup;
  public submitted = false;
  public loading: boolean = false;
  values: any;
  hero: Hero = {
    id: undefined,
    name: ""
  };

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService,
    public dialogRef: MatDialogRef<EditHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) {
    this.values = this.data;
  }

  ngOnInit() {
    if (!this.data) {
      this.loadForm();
    } else {
      this.hero = this.values;
      this.loadForm();
    }
  }

  loadForm() {
    this.heroForm = this.formBuilder.group({
      name: [this.hero.name.toLocaleUpperCase(), Validators.required],
    });
  }

  get f() {
    return this.heroForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.heroForm.invalid) {
      return;
    } else {
      this.data ? this.edit() : this.create();
    }
  }

  edit() {
    this.hero;
    let bodydata = Object.assign(this.hero, this.heroForm.value);
    const sbCreate = this.heroService.updateHero(bodydata).subscribe(data => {
      this.onAdd.emit(data);
      this.dialogRef.close();
    })
    this.subscriptions.push(sbCreate);
  }

  create() {
    let bodydata = Object.assign(this.heroForm.value, {});
    const sbCreate = this.heroService.createHero(bodydata).subscribe(data => {
      this.onAdd.emit(data);
      this.dialogRef.close();
    })
    this.subscriptions.push(sbCreate);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}

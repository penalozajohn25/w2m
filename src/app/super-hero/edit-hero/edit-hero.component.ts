import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {
  heroForm!: FormGroup;
  public submitted = false;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) {}

  ngOnInit() {
    this.heroForm = this.formBuilder.group({
      name: ["", Validators.required],
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
    }
  }
}

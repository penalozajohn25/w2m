import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-delete-hero-modal',
  templateUrl: './delete-hero-modal.component.html',
  styleUrls: ['./delete-hero-modal.component.scss']
})
export class DeleteHeroModalComponent implements OnInit {
  @Output() onAdd = new EventEmitter<any>(true);
  private subscriptions: Subscription[] = [];

  values: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteHeroModalComponent>,
    private heroService: HeroService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog) {
    this.values = this.data;
  }

  ngOnInit() {
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe(response => {
      this.onAdd.emit(response);
      this.dialogRef.close();
    })
  }
}

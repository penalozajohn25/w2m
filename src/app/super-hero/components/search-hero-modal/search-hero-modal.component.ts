import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-search-hero-modal',
  templateUrl: './search-hero-modal.component.html',
  styleUrls: ['./search-hero-modal.component.scss']
})
export class SearchHeroModalComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;
  private searchTerms = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<SearchHeroModalComponent>,
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}

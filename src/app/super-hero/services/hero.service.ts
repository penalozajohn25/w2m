import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Hero } from '../models/hero.model';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private api = `${environment.api}`;  // URL to web api
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.api)
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.api, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    this._isLoading$.next(true);
    return this.http.put<Hero>(this.api, hero).pipe(
      catchError(err => {
        console.error('UPDATE ITEM', hero, err);
        return of(hero);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    let url = `${this.api}/${hero.id}`;
    this._isLoading$.next(true);
    return this.http.delete<Hero>(url).pipe(
      catchError(err => {
        console.error('DELETE ITEM', hero, err);
        return of(hero);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  getHeroId(id: number): Observable<Hero> {
    this._isLoading$.next(true);
    const url = `${this.api}/${id}`;
    return this.http.get<Hero>(url).pipe(
      catchError(err => {
        console.error('GET ITEM BY IT', id, err);
        return of({ id: null, name: "" });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.api}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found heroes matching "${term}"`) :
        console.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

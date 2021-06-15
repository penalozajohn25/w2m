import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private api = `${environment.api}`;  // URL to web api
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.api)
  }
}

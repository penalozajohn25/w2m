import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../models/hero.model';
// import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Strange' },
      { id: 12, name: 'Spiderman' },
      { id: 13, name: 'Capitan America' },
      { id: 14, name: 'Iron Man' },
      { id: 15, name: 'Magneto' },
      { id: 16, name: 'Deadpool' },
      { id: 17, name: 'Capitana Marvel' },
      { id: 18, name: 'Wanda' },
      { id: 19, name: 'Vision' },
      { id: 20, name: 'Thor' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
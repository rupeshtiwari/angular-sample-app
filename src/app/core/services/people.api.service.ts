import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { People } from '../models/people';

@Injectable({ providedIn: 'root' })
export class PeopleApiService {
  get allPerson$(): Observable<People[]> {
    return of([
      {
        id: 1,
        name: 'Cierra Vega',
      },
      {
        id: 2,
        name: 'Thomas Crane',
      },
      {
        id: 3,
        name: 'Bradyn Kramer',
      },
      {
        name: 'Alvaro Mcgee',

        id: 4,
      },
      {
        name: 'Pierre Cox',

        id: 5,
      },
    ]);
  }

  get allLevels() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  }
}

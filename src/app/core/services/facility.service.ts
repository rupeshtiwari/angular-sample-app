import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Facility } from '../models/facility';

@Injectable({ providedIn: 'root' })
export class FacilityService {
  private _selectedFacility$ = new BehaviorSubject<Facility>(null);

  get selectedFacility$() {
    return this._selectedFacility$.asObservable();
  }

  selectFacility(facility: Facility) {
    this._selectedFacility$.next(facility);
  }

  get selectedFacility() {
    return this._selectedFacility$.value;
  }
}

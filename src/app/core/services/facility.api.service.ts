import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Approver } from '../models/approver';
import { Facility } from '../models/facility';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class FacilityApiService {
  baseURL: string;
  _allApprovers$: BehaviorSubject<Approver[]> = new BehaviorSubject([
    {
      name: 'Cierra Vega',
      level: 1,
      minimumCost: 0,
      approverStructureId: 1,
      approverId: 1,
    },
    {
      name: 'Thomas Crane',
      level: 2,
      minimumCost: 0,
      approverStructureId: 2,
      approverId: 2,
    },
    {
      name: 'Bradyn Kramer',
      level: 3,
      minimumCost: 50000,
      approverStructureId: 3,
      approverId: 3,
    },
  ]);
  allFacilities = [
    {
      division: 'Sales',
      name: 'East Brunswick',
      approverStructureId: 1,
      facilityId: 1,
    },
    {
      division: 'HR',
      name: 'Woodbridge',
      approverStructureId: 2,
      facilityId: 2,
    },
    {
      division: 'Billing',
      name: 'Chicago',
      facilityId: 3,
      approverStructureId: 3,
    },
  ];
  constructor(
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) {
    this.baseURL = environment.baseURL;
  }

  addNewApprover(approverToAdd: Approver) {
    approverToAdd.approverStructureId = this._allApprovers$.value.length + 1;
    const allApprovers = this._allApprovers$.value;
    allApprovers.push(approverToAdd);

    this._allApprovers$.next(allApprovers);

    return of(approverToAdd);
  }

  deleteApprover(id: number) {
    const newApprovers = this._allApprovers$.value.filter(
      (a) => a.approverId !== id
    );
    this._allApprovers$.next(newApprovers);
  }

  updateApprover(approverToUpdate: Approver) {
    let allApprovers = this._allApprovers$.value;
    allApprovers = allApprovers.map((approver) =>
      approver.approverStructureId === approverToUpdate.approverStructureId
        ? approverToUpdate
        : approver
    );

    this._allApprovers$.next(allApprovers);

    return of(approverToUpdate);
  }

  get allApprovers$() {
    return this._allApprovers$.asObservable();
  }

  getAllFacilities() {
    // const url = `${this.baseURL}GetAllFacilities`;
    // return this.httpClient.post<Facility[]>(url, {}).pipe(
    //   map((response: any) => response['d']),
    //   catchError((e) => throwError(e))
    // );

    return of(this.allFacilities);
  }

  getApproversForFacility(facilityId: number) {
    this.loggerService.log(`fetching approvers for facility ${facilityId}`);
    return this._allApprovers$.asObservable().pipe(delay(500));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Facility } from '../core/models/facility';
import { FacilityApiService } from '../core/services/facility.api.service';
import { FacilityService } from '../core/services/facility.service';

@Component({
  selector: 'aprstruct-facilites',
  templateUrl: './facilites.component.html',
  styleUrls: ['./facilites.component.css'],
})
export class FacilitesComponent implements OnInit, OnDestroy {
  facilities$: Observable<Facility[]>;
  displayedColumns: string[] = ['division', 'name', 'action'];
  isLoading = true;
  readonly dataSource: MatTableDataSource<Facility> = new MatTableDataSource();
  facilitySubscription: Subscription;

  constructor(
    private facilityService: FacilityService,
    private facilityApiService: FacilityApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.facilitySubscription = this.facilityApiService
      .getAllFacilities()
      .subscribe((data) => {
        this.isLoading = false;
        this.dataSource.data = data;
      });
  }

  ngOnDestroy(): void {
    if (this.facilitySubscription) {
      this.facilitySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {}

  viewApprovers(facility: Facility) {
    this.facilityService.selectFacility(facility);
    this.router.navigate([`approvers/${facility.facilityId}`], {
      queryParams: {
        facilityName: facility.name,
        division: facility.division,
      },
      relativeTo: this.route,
    });
  }
}

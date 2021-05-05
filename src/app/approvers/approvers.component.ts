import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Approver } from '../core/models/approver';
import { FacilityApiService } from '../core/services/facility.api.service';
import { LoggerService } from '../core/services/logger.service';
import { SelectedApproverDialogComponent } from '../selected-approver-dialog/selected-approver-dialog.component';

@Component({
  selector: 'aprstruct-approvers',
  templateUrl: './approvers.component.html',
  styleUrls: ['./approvers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproversComponent implements OnInit {
  approvers$: Observable<Approver[]>;
  displayedColumns: string[] = ['level', 'name', 'minimumCost', 'action'];
  dataSource$;
  facilityId;
  facilityName: string;
  division: string;
  isLoading = true;
  approverDialogWidth = '500px';

  readonly dataSource: MatTableDataSource<Approver> = new MatTableDataSource();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private facilityApiSesrvice: FacilityApiService,
    private logService: LoggerService
  ) {
    this.facilityName = this.queryParams('facilityName');
    this.division = this.queryParams('division');
    this.facilityId = +this.queryParams('facilityId');

    this.dataSource$ = this.facilityApiSesrvice
      .getApproversForFacility(this.facilityId)
      .subscribe((data) => {
        this.dataSource.data = data.sort((a, b) =>
          a.level > b.level ? 0 : -1
        );
        this.isLoading = false;
        console.log(data);
      });
  }

  private queryParams(id: string) {
    return this.route.snapshot.queryParams[id];
  }

  ngOnInit(): void {
    this.isLoading = true;
  }

  confirmDelete(event, approver: Approver) {
    event.preventDefault();
    confirm(`Are you sure you want to delete ${approver.name}`);
    this.facilityApiSesrvice.deleteApprover(approver.approverId);
  }

  openEditApprover(event, approver: Approver) {
    event.preventDefault();
    const data = {
      approver,
      facilityName: this.facilityName,
      facilityId: this.facilityId,
      action: 'Update',
      approverStructureId: approver.approverStructureId,
    };
    this.logService.log(data);
    const dialogRef = this.dialog.open(SelectedApproverDialogComponent, {
      width: this.approverDialogWidth,
      data,
      autoFocus: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(({ action }) => {
      if (action === 'saved') {
        this._snackBar.open(
          'Your recent changes are saved successfully!',
          'close',
          { duration: 3000, verticalPosition: 'top' }
        );
      }
    });
  }

  openAddApprover(event) {
    event.preventDefault();
    const data = {
      facilityName: this.facilityName,
      facilityId: this.facilityId,
      action: 'Create',
    };
    this.logService.log(data);
    const dialogRef = this.dialog.open(SelectedApproverDialogComponent, {
      width: this.approverDialogWidth,
      data,
      autoFocus: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(({ action }) => {
      if (action === 'saved') {
        this._snackBar.open(
          'Your recent changes are saved successfully!',
          'close',
          { duration: 3000, verticalPosition: 'top' }
        );
      }
    });
  }
}

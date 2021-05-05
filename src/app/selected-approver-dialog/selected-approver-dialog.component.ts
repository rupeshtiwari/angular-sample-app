import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { People } from '../core/models/people';
import { SelectedApproverDialogData } from '../core/models/selected-approver-dialog-data';
import { FacilityApiService } from '../core/services/facility.api.service';
import { PeopleApiService } from '../core/services/people.api.service';

@Component({
  selector: 'aprstruct-selected-approver-dialog',
  templateUrl: './selected-approver-dialog.component.html',
  styleUrls: ['./selected-approver-dialog.component.css'],
})
export class SelectedApproverDialogComponent implements OnInit, OnDestroy {
  selectedApproverId: number;
  selectedLevel;
  minimumCost = 0;
  facilityId;

  isSaving = false;
  allApprovers: People[];
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<SelectedApproverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectedApproverDialogData,
    private approversApiService: PeopleApiService,
    private facilityApiService: FacilityApiService
  ) {
    this.initialize();

    this.subscriptions.push(
      this.approversApiService.allPerson$.subscribe(
        (approvers) => (this.allApprovers = approvers)
      )
    );
  }

  private initialize() {
    this.facilityId = this.data.facilityId;

    if (this.data.action === 'Update') {
      this.selectedLevel = +this.data.approver.level;
      this.selectedApproverId = this.data.approver.approverId;
      this.minimumCost = this.data.approver.minimumCost;
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions != null) {
      this.subscriptions.forEach((s) => s.unsubscribe());
    }
  }

  ngOnInit(): void {}

  close(event) {
    event.preventDefault();
    this.dialogRef.close({ action: 'cancel' });
  }

  async save(event) {
    this.isSaving = true;
    event.preventDefault();

    if (this.isCreateAction) {
      await this.facilityApiService
        .addNewApprover(this.approverToSave)
        .toPromise();
    } else {
      await this.facilityApiService
        .updateApprover(this.approverToSave)
        .toPromise();
    }

    this.isSaving = false;
    this.dialogRef.close({ action: 'saved' });
  }

  get approverToSave() {
    return {
      level: this.selectedLevel,
      minimumCost: this.minimumCost,
      approverId: this.selectedApproverId,
      facilityId: this.facilityId,
      approverStructureId: this.data.approverStructureId,
      name: this.allApprovers
        .filter((approver) => approver.id === this.selectedApproverId)
        .pop().name,
    };
  }

  get isCreateAction() {
    return this.data.action === 'Create';
  }

  get allLevels() {
    return this.approversApiService.allLevels;
  }

  get facilityName() {
    return this.data.facilityName;
  }

  get header() {
    if (this.data.action === 'Create') {
      return `CREATE NEW APPROVER`;
    } else {
      return `UPDATE APPROVER`;
    }
  }
}

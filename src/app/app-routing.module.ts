import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproversComponent } from './approvers/approvers.component';
import { FacilitesComponent } from './facilites/facilites.component';

const routes: Routes = [
  {
    path: '',
    component: FacilitesComponent,
  },
  {
    path: 'Capital/approvalstructure.aspx',
    component: FacilitesComponent,
  },
  {
    path: 'approvers/:facilityId',
    component: ApproversComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

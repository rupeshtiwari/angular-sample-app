import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacilitesComponent } from './facilites/facilites.component';
import { MaterialModule } from './material.module';
import { ApproversComponent } from './approvers/approvers.component';
import {SelectedApproverDialogComponent} from './selected-approver-dialog/selected-approver-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FacilitesComponent, ApproversComponent,SelectedApproverDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[SelectedApproverDialogComponent]
})
export class AppModule {}

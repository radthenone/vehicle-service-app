import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { VehicleCreateComponent } from './vehicle-create/vehicle-create.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { RouterLink } from '@angular/router';
import { VehicleDetailComponent } from './vehicle-list/vehicle-detail/vehicle-detail.component';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  declarations: [VehicleCreateComponent, VehicleDetailComponent, VehicleListComponent],
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, SharedModule],
  providers: [],
  bootstrap: [],
  exports: [],
})
export class VehiclesModule {}

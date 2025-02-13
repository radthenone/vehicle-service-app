import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceBookletCreateComponent } from './service-booklet-create/service-booklet-create.component';
import { ServiceBookletDetailComponent } from './service-booklet-list/service-booklet-detail/service-booklet-detail.component';
import { ServiceBookletListComponent } from './service-booklet-list/service-booklet-list.component';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  declarations: [ServiceBookletCreateComponent, ServiceBookletDetailComponent, ServiceBookletListComponent],
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, SharedModule],
  providers: [],
  bootstrap: [],
  exports: [],
})
export class BookletsModule {}

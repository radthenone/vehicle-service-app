import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AnonGuard } from './auth/guards/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { VehicleCreateComponent } from './vehicles/vehicle-create/vehicle-create.component';
import { VehicleDetailComponent } from './vehicles/vehicle-list/vehicle-detail/vehicle-detail.component';
import { ServiceBookletCreateComponent } from './service-booklets/service-booklet-create/service-booklet-create.component';
import { ServiceBookletDetailComponent } from './service-booklets/service-booklet-list/service-booklet-detail/service-booklet-detail.component';
import { ServiceBookletListComponent } from './service-booklets/service-booklet-list/service-booklet-list.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AnonGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  {
    path: 'vehicles',
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: VehicleCreateComponent },
      { path: '', component: VehicleListComponent },
      { path: ':id', component: VehicleDetailComponent },
    ],
  },
  {
    path: 'booklets',
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: ServiceBookletCreateComponent },
      { path: '', component: ServiceBookletListComponent },
      { path: ':id', component: ServiceBookletDetailComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Vehicle } from './vehicles/vehicle.interface';
import { VehicleService } from './vehicles/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUsername: string | undefined = undefined;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUsername = user?.username;
      this.isAuthenticated = !!user;
    });
    this.vehicleService.selectedVehicle$.subscribe();
  }

  onLogout(event: void): void {
    console.log('User logged out', event);
    this.authService.logout();
  }
}

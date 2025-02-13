import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle, VehicleWithBooklets } from '../../vehicle.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../vehicle.service';
import { ServiceBooklet } from '../../../service-booklets/service-booklet.interface';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css'],
})
export class VehicleDetailComponent implements OnInit {
  vehicle!: Vehicle;
  booklets: Omit<ServiceBooklet, 'vehicle'>[] = [];
  vehicleId: string | null = null;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    if (this.vehicleId) {
      this.vehicleService.getVehicle(+this.vehicleId).subscribe((vehicle) => (this.vehicle = vehicle));
      this.vehicleService.getVehicleBooklets(+this.vehicleId).subscribe((booklets) => (this.booklets = booklets));
    }
  }

  deleteVehicle(): void {
    if (this.vehicle && this.vehicle.id) {
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(() => {
        this.vehicle = null!;
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.interface';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.filteredVehicles = vehicles;
    });
  }

  onSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredVehicles = this.vehicles;
      return;
    }

    this.filteredVehicles = this.vehicles.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.year.toString().includes(searchTerm) ||
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setVehicle(vehicle: Vehicle) {
    this.vehicleService.setSelectedVehicle(vehicle);
  }

  onDeleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe(() => {
      this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
    });
  }
}

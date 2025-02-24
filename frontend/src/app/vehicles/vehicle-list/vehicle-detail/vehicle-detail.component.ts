import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../vehicle.interface';
import { ActivatedRoute } from '@angular/router';
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
  filename: string = '';

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    if (this.vehicleId) {
      this.vehicleService.getVehicle(+this.vehicleId).subscribe((vehicle) => {
        this.vehicle = vehicle;
        this.booklets = vehicle.booklets;
      });
      // this.vehicleService.getVehicleBooklets(+this.vehicleId).subscribe((booklets) => (this.booklets = booklets));
    }
  }

  downloadCsv() {
    if (this.vehicleId) {
      this.vehicleService.downloadVehicleDataCsv(this.vehicleId).subscribe({
        next: (blob: Blob) => {
          if (blob.size > 0) {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${this.filename}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } else {
            console.error('Otrzymano pusty plik');
          }
        },
        error: (error) => {
          console.error('Błąd podczas pobierania CSV:', error);
        },
      });
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

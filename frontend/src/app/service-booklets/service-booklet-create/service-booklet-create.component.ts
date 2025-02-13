import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicles/vehicle.service';
import { Vehicle, VehicleControls } from '../../vehicles/vehicle.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceBooklet, ServiceBookletControls, ServiceBookletForm } from '../service-booklet.interface';
import { ServiceBookletService } from '../service-booklet.service';

@Component({
  selector: 'app-service-booklet-create',
  templateUrl: './service-booklet-create.component.html',
  styleUrls: ['./service-booklet-create.component.css'],
})
export class ServiceBookletCreateComponent implements OnInit {
  vehicle!: Vehicle;
  serviceBookletForm!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private serviceBookletService: ServiceBookletService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.vehicleService.selectedVehicle$.subscribe((vehicle) => {
      if (vehicle) {
        this.vehicle = vehicle;
      }
    });
    this.serviceBookletForm = this.fb.group({
      mileage: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$'), Validators.min(1)]],
      description: ['', [Validators.required]],
      cost: ['', [Validators.required, Validators.min(5), Validators.pattern('^[1-9][0-9]*([.][0-9]{1,2})?$')]],
    });
  }

  get field() {
    return this.serviceBookletForm.controls as unknown as ServiceBookletControls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.serviceBookletForm.valid) {
      const newServiceBooklet: ServiceBooklet = this.serviceBookletForm.value;
      this.serviceBookletService.createBooklet(newServiceBooklet).subscribe({
        next: () => this.router.navigate(['/booklets']),
        error: (error) => console.error(error),
      });
    }
  }
}

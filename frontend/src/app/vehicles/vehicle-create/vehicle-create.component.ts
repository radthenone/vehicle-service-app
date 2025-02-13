import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleControls, Vehicle } from '../vehicle.interface';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.css'],
})
export class VehicleCreateComponent implements OnInit {
  vehicleForm!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      name: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: [null, [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]],
      vin: [
        '',
        [Validators.required, Validators.pattern('^[A-Z0-9]+$'), Validators.minLength(17), Validators.maxLength(17)],
      ],
    });
  }

  get field() {
    return this.vehicleForm.controls as unknown as VehicleControls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.vehicleForm.valid) {
      const newVehicle: Vehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(newVehicle).subscribe({
        next: () => this.router.navigate(['/vehicles']),
        error: (error) => {
          console.error(error);
          if (error.status === 400) {
            this.errorMessage = 'VIN already exists. Please choose a different VIN.';
          } else {
            this.errorMessage = 'An error occurred during vehicle creation. Please try again later.';
          }
        },
      });
    }
  }
}

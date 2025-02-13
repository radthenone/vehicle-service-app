import { AbstractControl } from '@angular/forms';
import { ServiceBooklet } from '../service-booklets/service-booklet.interface';

export interface Vehicle {
  id?: number;
  name: string;
  model: string;
  year: number;
  vin: string;
}

export interface VehicleWithBooklets extends Vehicle {
  booklets: Omit<ServiceBooklet, 'vehicle'>[];
}

export interface VehicleControls {
  name: AbstractControl;
  model: AbstractControl;
  year: AbstractControl;
  vin: AbstractControl;
}

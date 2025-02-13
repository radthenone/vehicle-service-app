import { AbstractControl } from '@angular/forms';

export interface ServiceBooklet {
  id?: number;
  date: string;
  mileage: number;
  description: string;
  cost: number;
  vehicle: number;
}

export interface ServiceBookletForm {
  mileage: number;
  description: string;
  cost: number;
}

export interface ServiceBookletControls {
  mileage: AbstractControl;
  description: AbstractControl;
  cost: AbstractControl;
}

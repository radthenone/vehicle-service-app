import { AbstractControl } from '@angular/forms';

export type RegisterControls = {
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  first_name: AbstractControl;
  last_name: AbstractControl;
};

export type LoginControls = {
  username: AbstractControl;
  password: AbstractControl;
};

export interface UserData {
  username: string;
  email?: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface RegisterData extends UserData {
  rewrite_password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

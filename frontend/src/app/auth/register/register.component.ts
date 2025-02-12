import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterControls, RegisterData, UserData } from '../auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
    });
    this.registerForm.setValidators(this.passwordMatchValidator());
  }

  public passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password');
      const confirmPassword = group.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { mismatch: true };
      }

      return null;
    };
  }

  public get field(): RegisterControls {
    return this.registerForm.controls as unknown as RegisterControls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const registerData: RegisterData = {
        username: formValue.username,
        email: formValue.email,
        first_name: formValue.first_name,
        last_name: formValue.last_name,
        password: formValue.password,
        rewrite_password: formValue.confirmPassword,
      };

      this.authService.register(registerData).subscribe({
        next: (response: UserData) => {
          console.log('Registration successful', response);
          this.loading = false;
          this.router.navigate(['/login']).then();
        },
        error: (error) => {
          console.error('Registration error', error);
          this.loading = false;
          this.registerForm.reset();
        },
      });
    }
  }
}

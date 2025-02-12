import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, LoginControls, LoginData } from '../auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public get field(): LoginControls {
    return this.loginForm.controls as unknown as LoginControls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginData: LoginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (response: AuthResponse) => {
          console.log('Login successful', response);
          this.loading = false;
          this.router.navigate(['/']).then();
        },
        error: (error) => {
          console.error('Login error', error);
          this.loading = false;
          this.loginForm.reset();
        },
      });
    }
  }
}

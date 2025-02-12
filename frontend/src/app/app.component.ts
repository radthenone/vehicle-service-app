import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUsername: string | undefined = undefined;
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUsername = user?.username;
      this.isAuthenticated = !!user;
    });
  }

  onEventLogout(event: void): void {
    console.log('User logged out', event);
    this.currentUsername = undefined;
    this.isAuthenticated = false;
  }
}

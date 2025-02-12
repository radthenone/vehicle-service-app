import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
    this.logoutEvent.emit();
  }
}

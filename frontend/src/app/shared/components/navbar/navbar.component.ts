import { Component, EventEmitter, Input, Output, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() username?: string;
  @Input() isAuthenticated?: boolean;
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  logout() {
    this.logoutEvent.emit();
  }

  toggleMenu() {
    const navbarCollapse = this.el.nativeElement.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      this.renderer.removeClass(navbarCollapse, 'show');
    } else {
      this.renderer.addClass(navbarCollapse, 'show');
    }
  }
}

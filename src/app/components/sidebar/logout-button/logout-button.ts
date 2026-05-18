import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  constructor(private router: Router) {}

  logout() {
    // 1. Borramos los datos de sesión
    localStorage.clear(); 
    
    // 2. Redirigimos al login
    this.router.navigate(['/login']);
  }
}

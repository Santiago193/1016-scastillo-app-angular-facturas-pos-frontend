import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth'; // 1. Cambiado a AuthService
import { Router } from '@angular/router';
import { User } from '../../models/user.model';     // 2. Importamos el modelo para evitar el error de 'any'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth, // 3. Usar el nombre de clase correcto
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // login.ts

onSubmit() {
  if (this.loginForm.valid) {
    this.auth.login(this.loginForm.value).subscribe({
      next: (user: User) => {
        // --- LOGS CONSERVADOS ---
        console.log('1. Objeto completo recibido:', user);
        console.log('2. El rol es:', user.role);

        // --- IMPORTANTE: GUARDAR DATOS PARA USER-CARD ---
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);
        // localStorage.setItem('userphoto', user.profile_url); // Descomenta cuando lo tengas
        if (user.token) {
    localStorage.setItem('token', user.token); // <--- ESTO FALTA
  }

        if (user.role === 'ADMIN') {
          console.log('3. Intentando navegar a /dashboard/admin');
          // BORRAR: this.router.navigate(['/admin']);
          this.router.navigate(['/dashboard/admin']); // NUEVA RUTA
        } else if (user.role === 'EMPLEADO') {
          console.log('3. Intentando navegar a /dashboard/pos');
          // BORRAR: this.router.navigate(['/empleado']);
          this.router.navigate(['/dashboard/pos']); // NUEVA RUTA
        } else {
          console.warn('3. El rol no coincide con ADMIN ni EMPLEADO');
        }
      },
      error: (err) => {
        console.error('Error capturado por Angular:', err);
        this.errorMessage = 'Error de conexión o credenciales';
      }
    });
  }
}
}
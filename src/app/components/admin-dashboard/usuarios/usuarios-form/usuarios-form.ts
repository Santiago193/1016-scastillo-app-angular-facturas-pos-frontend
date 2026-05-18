import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { output } from '@angular/core'; 
import { User } from '../../../../models/user.model'; // Tu modelo
import { UsuariosService } from '../../../../services/usuarios';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios-form.html',
  styleUrl: './usuarios-form.css',
})
export class UsuariosForm {
  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService); 

  onUsuarioCreado = output<any>(); 

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['EMPLEADO', [Validators.required]] 
  });

  onSubmit() {
    if (this.userForm.valid) {
      // Definimos el tipo exacto que espera el servicio
      const datosEnvio = this.userForm.value as Omit<User, 'token' | 'id'> & { password: string };

      this.usuariosService.create(datosEnvio).subscribe({
        next: (res: any) => {
          console.log('Usuario creado con éxito');
          this.onUsuarioCreado.emit(res);
          this.userForm.reset({ role: 'EMPLEADO' });
        },
        error: (err: any) => {
          console.error('Error en la petición:', err);
        }
      });
    }
  }
}
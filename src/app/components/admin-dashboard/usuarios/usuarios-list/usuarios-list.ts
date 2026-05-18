import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserResponse } from '../../../../models/user.model';
import { UsuariosService } from '../../../../services/usuarios';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-list.html'
})
export class UsuariosList implements OnInit {
  private userSvc = inject(UsuariosService); 

  listaUsuarios = signal<UserResponse[]>([]); 
  filtroNombre = signal('');
  usuarioEditando = signal<number | null>(null);
  
  usuariosFiltrados = computed(() => {
    const termino = this.filtroNombre().toLowerCase();
    return this.listaUsuarios().filter(u => 
      u.username.toLowerCase().includes(termino)
    );
  });

  ngOnInit() { this.cargar(); }

  cargar() {
    this.userSvc.getAll().subscribe({
      next: (data) => this.listaUsuarios.set(data),
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  iniciarEdicion(id: number) {
    this.usuarioEditando.set(id);
  }

  // --- LO QUE FALTABA: MÉTODO PARA CANCELAR ---
  cancelarEdicion() {
    this.usuarioEditando.set(null);
    this.cargar(); // Recargamos para descartar cambios locales que no se guardaron
  }

  // --- CAMBIO DE NOMBRE: En el HTML usabas 'guardarCambios' ---
  guardarCambios(user: any) {
    this.userSvc.update(user.id, user).subscribe({
      next: () => {
        this.usuarioEditando.set(null);
        this.cargar();
        // Un alert es funcional, pero podrías usar un toast después
        console.log('Usuario actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('No se pudo actualizar el usuario');
      }
    });
  }
}
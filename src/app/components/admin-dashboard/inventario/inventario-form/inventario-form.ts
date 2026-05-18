import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../../models/producto.model';
import { InventarioService } from '../../../../services/inventarioService';
@Component({
  selector: 'app-inventario-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-form.html',
  styleUrl: './inventario-form.css',
})
export class InventarioForm {
  private invSvc = inject(InventarioService);

  // Usamos un objeto inicial limpio
  nuevoProducto = signal<any>({
    nombre: '',
    descripcion: '',
    precioCompra: 0,
    precioVenta: 0,
    stock: 0,
    categoria: 'General',
    codigoBarras: '',
    activo: true // Valor por defecto: disponible para venta
  });

  registrar() {
    const data = this.nuevoProducto();
    
    // Validación básica antes de enviar
    if (!data.nombre || !data.codigoBarras || data.precioVenta <= 0) {
      alert('Por favor rellena el nombre, código y precio de venta.');
      return;
    }

    this.invSvc.create(data).subscribe({
      next: () => {
        alert('¡Producto agregado con éxito!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al guardar: Revisa que el código de barras no esté duplicado.');
      }
    });
  }

  resetForm() {
    this.nuevoProducto.set({
      nombre: '',
      descripcion: '',
      precioCompra: 0,
      precioVenta: 0,
      stock: 0,
      categoria: 'General',
      codigoBarras: '',
      activo: true
    });
  }
}
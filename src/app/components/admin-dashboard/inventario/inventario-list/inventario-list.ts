import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { InventarioService } from '../../../../services/inventarioService';
import { FormsModule } from '@angular/forms'; // 1. Importar aquí

@Component({
  selector: 'app-inventario-list',
  imports: [ FormsModule],
  templateUrl: './inventario-list.html',
  styleUrl: './inventario-list.css',
})
export class InventarioList implements OnInit {
  private invSvc = inject(InventarioService);

  // Usamos any[] para evitar las líneas rojas de la imagen
  productos = signal<any[]>([]);
  filtro = signal('');
  editandoId = signal<number | null>(null);

  productosFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    return this.productos().filter(p => 
      p.nombre.toLowerCase().includes(f) || 
      p.codigoBarras.toLowerCase().includes(f)
    );
  });

  ngOnInit() { this.cargar(); }

  cargar() {
    this.invSvc.getAll().subscribe({
      next: (data) => this.productos.set(data),
      error: (err) => console.error('Error al cargar inventario:', err)
    });
  }

  guardarCambios(p: any) {
    this.invSvc.update(p.id, p).subscribe({
      next: () => {
        this.editandoId.set(null);
        this.cargar();
      }
    });
  }

  toggleActivo(p: any) {
    p.activo = !p.activo;
    this.guardarCambios(p);
  }
}
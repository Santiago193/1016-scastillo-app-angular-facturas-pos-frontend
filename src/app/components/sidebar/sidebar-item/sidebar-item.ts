import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar-item',
  imports: [RouterLink],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.css',
})
export class SidebarItem {
  userRole = localStorage.getItem('role'); // Asegúrate de tener esto

   menuOptions = [
  // --- SECCIÓN ADMIN ---
  { 
    label: 'Dashboard', 
    subLabel: 'Resumen y Alertas', 
    path: '/dashboard/admin', 
    roles: ['ADMIN'],
    icon: 'dashboard' // Usa el nombre o el path del icono que ya tienes
  },
  { 
    label: 'Inventario', 
    subLabel: 'Gestión de Productos', 
    path: '/dashboard/inventario', 
    roles: ['ADMIN'], 
    icon: 'inventory'
  },
  { 
    label: 'Gestión de Usuarios', 
    subLabel: 'Personal y Roles', 
    path: '/dashboard/usuarios', 
    roles: ['ADMIN'], 
    icon: 'group'
  },
  { 
    label: 'Reportes', 
    subLabel: 'Ventas y Rendimiento', 
    path: '/dashboard/reportes', 
    roles: ['ADMIN'], 
    icon: 'assessment'
  },

  // --- SECCIÓN EMPLEADO ---
  { 
    label: 'Punto de Venta', 
    subLabel: 'Registrar Venta', 
    path: '/dashboard/pos', 
    roles: ['EMPLEADO'], 
    icon: 'shopping_cart'
  },
  { 
    label: 'Consultar Stock', 
    subLabel: 'Búsqueda de Productos', 
    path: '/dashboard/consultas', 
    roles: ['EMPLEADO'], 
    icon: 'search'
  },
  { 
    label: 'Mis Ventas', 
    subLabel: 'Control de Arqueo', 
    path: '/dashboard/mis-ventas', 
    roles: ['EMPLEADO'], 
    icon: 'history'
  }
];

}

import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard'; 
import { Inventario } from './components/admin-dashboard/inventario/inventario';
import { Usuarios } from './components/admin-dashboard/usuarios/usuarios';
import { Reportes } from './components/admin-dashboard/reportes/reportes';
import { Pos } from './components/empleado-dashboard/pos/pos';
import { Consultas } from './components/empleado-dashboard/consultas/consultas';
import { MisVentas } from './components/empleado-dashboard/mis-ventas/mis-ventas';
import { DashboardSite } from './components/admin-dashboard/dashboard-site/dashboard-site';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    
    // --- NUEVA ESTRUCTURA ---
    { 
    path: 'dashboard', 
    component: Dashboard,
    children: [
      // RUTAS ADMIN
      { path: 'admin', component: DashboardSite },
      { path: 'inventario', component: Inventario },
      { path: 'usuarios', component: Usuarios },
      { path: 'reportes', component: Reportes },
      
      // RUTAS EMPLEADO
      { path: 'pos', component: Pos },
      { path: 'consultas', component: Consultas },
      { path: 'mis-ventas', component: MisVentas },
    ]
  },
    // -------------------------

    { path: '**', redirectTo: 'login' }
];
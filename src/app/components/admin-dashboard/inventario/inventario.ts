import { Component } from '@angular/core';
import { InventarioForm } from "./inventario-form/inventario-form";
import { InventarioList } from "./inventario-list/inventario-list";

@Component({
  selector: 'app-inventario',
  imports: [InventarioForm, InventarioList],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario {}

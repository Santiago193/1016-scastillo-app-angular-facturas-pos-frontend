import { Component } from '@angular/core';
import { UsuariosForm } from "./usuarios-form/usuarios-form";
import { UsuariosList } from "./usuarios-list/usuarios-list";

@Component({
  selector: 'app-usuarios',
  imports: [UsuariosForm, UsuariosList],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {}

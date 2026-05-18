import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard implements OnInit{

  userName: string = '';
  userRole: string = '';
  userPhoto: string = '';

  ngOnInit(): void {
    this.userName = localStorage.getItem('username') || 'Usuario';
    this.userRole = localStorage.getItem('role') || 'Invitado';
    
    // Intentamos obtener la foto, si no existe, usamos un generador de avatares
    const savedPhoto = localStorage.getItem('userphoto');
    
    if (savedPhoto) {
      this.userPhoto = savedPhoto;
    } else {
      // Este servicio genera una imagen con las iniciales del usuario automáticamente
      this.userPhoto = `https://ui-avatars.com/api/?name=${this.userName}&background=0D8ABC&color=fff`;
    }
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/users';

  // Usamos la misma estructura que en el componente
  create(user: Omit<User, 'token' | 'id'> & { password: string }): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.API_URL, user);
  }

  getAll(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.API_URL);
  }

  update(id: number, user: any): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.API_URL}/${id}`, user);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
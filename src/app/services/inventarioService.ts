import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/productos';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  create(producto: any): Observable<any> {
    return this.http.post<any>(this.API_URL, producto);
  }

  update(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, producto);
  }
}
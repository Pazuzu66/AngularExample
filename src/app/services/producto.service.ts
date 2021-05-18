import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModule } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService 
{
  url = 'https://alanapiproductos.herokuapp.com/api/productos/';
  constructor(private http: HttpClient) { }

  getProductos(): Observable<any>
  {
    return this.http.get(this.url);
  }

  eliminarProducto(id: string): Observable<any>
  {
    return this.http.delete(this.url + id);
  }
  guardarProducto(producto: ProductoModule): Observable<any>
  {
    return this.http.post(this.url,producto);
  }

  
  obtenerProducto(id: string): Observable<any>
  {
    return this.http.get(this.url + id);
  }
  editarProducto(id: string, producto: ProductoModule): Observable<any>
  {
    return this.http.put(this.url +id, producto);
  }
}

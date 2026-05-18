export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
  categoria: string;
  codigoBarras: string;
  activo: boolean;
}
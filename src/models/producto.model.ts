import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {Categoria} from './categoria.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  precio: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Proveedor, {name: 'proveedor'})
  proveedorID: string;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  @belongsTo(() => Categoria)
  categoriaId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;

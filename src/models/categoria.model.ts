import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Categoria extends Entity {
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
  tipo_animal: string;

  @belongsTo(() => Producto, {name: 'producto'})
  vacunacionID: string;

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;

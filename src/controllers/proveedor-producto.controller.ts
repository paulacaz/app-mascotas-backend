import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Proveedor,
  Producto,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorProductoController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.proveedorRepository.productos(id).find(filter);
  }

  @post('/proveedors/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInProveedor',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.proveedorRepository.productos(id).create(producto);
  }

  @patch('/proveedors/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedor.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.proveedorRepository.productos(id).patch(producto, where);
  }

  @del('/proveedors/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedor.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.proveedorRepository.productos(id).delete(where);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Proveedor,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProveedorController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Proveedor> {
    return this.productoRepository.proveedor(id);
  }
}

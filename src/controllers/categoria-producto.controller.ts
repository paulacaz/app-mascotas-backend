import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Categoria,
  Producto,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaProductoController {
  constructor(
    @repository(CategoriaRepository)
    public categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Categoria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof Categoria.prototype.id,
  ): Promise<Producto> {
    return this.categoriaRepository.producto(id);
  }
}

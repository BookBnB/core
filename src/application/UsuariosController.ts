import {
    Get,
    JsonController,
    Params,
    UseBefore
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import UUID from '../domain/common/UUID';
import { ConsultaDePublicacionesPorAnfitrion, ListarPublicacionesPorAnfitrion } from '../domain/publicaciones/casos-uso/ListarPublicacionesPorAnfitrion';
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/usuarios')
export class UsuarioController {
    constructor(
        private readonly listarPublicaciones: ListarPublicacionesPorAnfitrion
    ) {
    }

    @Get('/:id/publicaciones')
    @OpenAPI({ summary: 'Lista las publicaciones de un anfitrión' })
    @ResponseSchema(PublicacionDTO)
    async listar(@Params() id: UUID): Promise<PublicacionDTO[]> {
        let consulta = new ConsultaDePublicacionesPorAnfitrion(id);

        return await this.listarPublicaciones.execute(consulta);
    }
}

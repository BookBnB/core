import {
    Authorized, CurrentUser, ForbiddenError,
    Get,
    JsonController,
    Params,
    UseBefore
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import UUID from '../domain/common/UUID';
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import Usuario from "../domain/usuarios/entidades/Usuario";
import {
    ConsultaDePublicacionesPorAnfitrion,
    ListarPublicacionesPorAnfitrion
} from "../domain/usuarios/casos-uso/ListarPublicacionesPorAnfitrion";

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/usuarios')
export class UsuarioController {
    constructor(
        private readonly listarPublicaciones: ListarPublicacionesPorAnfitrion
    ) {
    }

    @Get('/:id/publicaciones')
    @Authorized("host")
    @OpenAPI({ summary: 'Lista las publicaciones de un anfitrión' })
    @ResponseSchema(PublicacionDTO)
    async listar(@CurrentUser() usuario: Usuario, @Params() {id}: UUID): Promise<PublicacionDTO[]> {
        if(usuario.id !== id) throw new ForbiddenError('Access is denied');

        let consulta = new ConsultaDePublicacionesPorAnfitrion(id);

        return await this.listarPublicaciones.execute(consulta);
    }
}

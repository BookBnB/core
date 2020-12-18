import {
    Authorized, Body, CurrentUser, ForbiddenError,
    Get,
    HttpCode,
    JsonController,
    Params,
    Post,
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
import OpenApiSpec from '../app/OpenApiSpec';
import { CrearUsuario, CrearUsuarioDTO } from '../domain/usuarios/casos-uso/CrearUsuario';
import UsuarioDTO from '../domain/usuarios/dtos/UsuarioDTO';

@OpenAPI({security: [{token: []}]})
@JsonController('/usuarios')
export class UsuarioController {
    constructor(
        private readonly listarPublicaciones: ListarPublicacionesPorAnfitrion,
        private readonly crearUsuario: CrearUsuario
    ) {
    }

    @Post('/')
    @HttpCode(201)
    @ResponseSchema(UsuarioDTO)
    async crear(@Body() body: CrearUsuarioDTO) {
        return await this.crearUsuario.execute(body)
    }

    @Get('/:id/publicaciones')
    @Authorized("host")
    @OpenAPI({ summary: 'Lista las publicaciones de un anfitrión' })
    @UseBefore(AuthenticationMiddleware)
    @ResponseSchema(PublicacionDTO)
    async listar(@CurrentUser() usuario: Usuario, @Params() {id}: UUID): Promise<PublicacionDTO[]> {
        if(usuario.id !== id) throw new ForbiddenError('Access is denied');

        let consulta = new ConsultaDePublicacionesPorAnfitrion(id);

        return await this.listarPublicaciones.execute(consulta);
    }
}

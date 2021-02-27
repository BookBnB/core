import {
    Authorized, Body, CurrentUser, ForbiddenError,
    Get,
    HttpCode,
    JsonController,
    Params,
    Post, QueryParams,
    UseBefore
} from 'routing-controllers';
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi';
import UUID from '../domain/common/UUID';
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import Usuario from "../domain/usuarios/entidades/Usuario";
import {
    ConsultaDePublicacionesPorAnfitrion,
    ListarPublicacionesPorAnfitrion
} from "../domain/usuarios/casos-uso/ListarPublicacionesPorAnfitrion";
import {CrearUsuario, CrearUsuarioDTO} from '../domain/usuarios/casos-uso/CrearUsuario';
import UsuarioDTO from '../domain/usuarios/dtos/UsuarioDTO';
import {
    ConsultaDeReservasPorHuesped,
    ListarReservasDeHuesped
} from "../domain/reservas/casos-uso/ListarReservasDeHuesped";
import ReservaDTO from "../domain/reservas/dtos/ReservaDTO";
import {ConsultaDeReservasPorPublicacion} from "../domain/reservas/casos-uso/ListarReservasDePublicacion";
import {CrearUsuarioConGoogle, CrearUsuarioConGoogleDTO} from "../domain/usuarios/casos-uso/CrearUsuarioConGoogle";


@OpenAPI({security: [{token: []}]})
@JsonController('/usuarios')
export class UsuarioController {
    constructor(
        private readonly listarPublicaciones: ListarPublicacionesPorAnfitrion,
        private readonly listarReservas: ListarReservasDeHuesped,
        private readonly crearUsuario: CrearUsuario,
        private readonly crearUsuarioConGoogle: CrearUsuarioConGoogle,
    ) {
    }

    @Post('/')
    @HttpCode(201)
    @ResponseSchema(UsuarioDTO)
    async crear(@Body() body: CrearUsuarioDTO) {
        return await this.crearUsuario.execute(body)
    }

    @Post('/google/')
    @HttpCode(201)
    @ResponseSchema(UsuarioDTO)
    async crearGoogle(@Body() body: CrearUsuarioConGoogleDTO) {
        return await this.crearUsuarioConGoogle.execute(body)
    }

    @Get('/:id/publicaciones')
    @Authorized("host")
    @OpenAPI({summary: 'Lista las publicaciones de un anfitrión'})
    @UseBefore(AuthenticationMiddleware)
    @ResponseSchema(PublicacionDTO)
    async listarPub(@CurrentUser() usuario: Usuario, @Params() {id}: UUID): Promise<PublicacionDTO[]> {
        if (usuario.id !== id && !usuario.tieneRol("admin")) throw new ForbiddenError('Access is denied');

        let consulta = new ConsultaDePublicacionesPorAnfitrion(id);

        return await this.listarPublicaciones.execute(consulta);
    }

    @Get('/:id/reservas')
    @Authorized(["guest", "admin"])
    @OpenAPI({summary: 'Lista las reservas de un huésped'})
    @UseBefore(AuthenticationMiddleware)
    @ResponseSchema(ReservaDTO)
    async listarRes(
        @CurrentUser() usuario: Usuario,
        @Params() {id}: UUID,
        @QueryParams() consulta: ConsultaDeReservasPorHuesped): Promise<ReservaDTO[]> {
        if (usuario.id !== id && !usuario.tieneRol("admin")) throw new ForbiddenError('Access is denied');

        return await this.listarReservas.execute(id, consulta);
    }
}

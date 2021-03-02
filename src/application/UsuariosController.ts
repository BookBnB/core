import {
    Authorized, Body, CurrentUser, ForbiddenError,
    Get,
    HttpCode,
    JsonController,
    Params,
    Post, Put, QueryParams,
    UseBefore
} from 'routing-controllers';
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi';
import UUID from '../domain/common/UUID';
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import Usuario, { RolUsuario } from "../domain/usuarios/entidades/Usuario";
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
import {CrearUsuarioConGoogle, CrearUsuarioConGoogleDTO} from "../domain/usuarios/casos-uso/CrearUsuarioConGoogle";
import DispositivoDTO from "../domain/usuarios/dtos/DispositivoDTO";
import {GuardarDispositivo} from "../domain/usuarios/casos-uso/GuardarDispositivo";


@OpenAPI({security: [{token: []}]})
@JsonController('/usuarios')
export class UsuarioController {
    constructor(
        private readonly listarPublicaciones: ListarPublicacionesPorAnfitrion,
        private readonly listarReservas: ListarReservasDeHuesped,
        private readonly crearUsuario: CrearUsuario,
        private readonly crearUsuarioConGoogle: CrearUsuarioConGoogle,
        private readonly guardarDispositivo: GuardarDispositivo,
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
    @Authorized(RolUsuario.ANFITRION)
    @OpenAPI({summary: 'Lista las publicaciones de un anfitrión'})
    @UseBefore(AuthenticationMiddleware)
    @ResponseSchema(PublicacionDTO)
    async listarPub(@CurrentUser() usuario: Usuario, @Params() {id}: UUID): Promise<PublicacionDTO[]> {
        if (usuario.id !== id && !usuario.tieneRol(RolUsuario.ADMIN)) throw new ForbiddenError('Access is denied');

        let consulta = new ConsultaDePublicacionesPorAnfitrion(id);

        return await this.listarPublicaciones.execute(consulta);
    }

    @Get('/:id/reservas')
    @Authorized([RolUsuario.HUESPED, RolUsuario.ADMIN])
    @OpenAPI({summary: 'Lista las reservas de un huésped'})
    @UseBefore(AuthenticationMiddleware)
    @ResponseSchema(ReservaDTO)
    async listarRes(
        @CurrentUser() usuario: Usuario,
        @Params() {id}: UUID,
        @QueryParams() consulta: ConsultaDeReservasPorHuesped): Promise<ReservaDTO[]> {
        if (usuario.id !== id && !usuario.tieneRol(RolUsuario.ADMIN)) throw new ForbiddenError('Access is denied');

        return await this.listarReservas.execute(id, consulta);
    }

    @Put('/:id/dispositivos')
    @OpenAPI({summary: 'Cambia el dispositivo del usuario'})
    @UseBefore(AuthenticationMiddleware)
    @ResponseSchema(DispositivoDTO)
    async guardarDispositivo_(
        @CurrentUser() usuario: Usuario,
        @Params() {id}: UUID,
        @Body() body: DispositivoDTO): Promise<DispositivoDTO> {
        if (usuario.id !== id) throw new ForbiddenError('Access is denied');

        return await this.guardarDispositivo.execute(usuario, body);
    }
}

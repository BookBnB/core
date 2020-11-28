import {
    Body,
    JsonController,
    Post,
    UnauthorizedError
} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import { CrearSesion } from '../domain/sesiones/casos-uso/CrearSesion';
import CrearSesionDTO from '../domain/sesiones/dtos/CrearSesionDTO';
import { Sesion } from '../domain/sesiones/entidades/Sesion';
import UsuarioNoReconocidoError from '../domain/sesiones/excepciones/UsuarioNoReconocidoError';

@JsonController('/sesiones')
export class SesionController {
    constructor(
        private readonly crearSesion: CrearSesion
    ) {
    }

    @Post('/')
    @OpenAPI({summary: 'Crear una Sesión'})
    @ResponseSchema(Sesion)
    async getAll(@Body() body: CrearSesionDTO) {
        try {
            return await this.crearSesion.execute(body);
        } catch (e) {
            if (e instanceof UsuarioNoReconocidoError) {
                throw new UnauthorizedError(e.message);
            }

            throw e;
        }
    }
}

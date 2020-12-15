import {
    Body,
    JsonController,
    Post,
    UnauthorizedError
} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import CrearSesionDTO, { CrearSesion } from '../domain/sesiones/casos-uso/CrearSesion';
import { Sesion } from '../domain/sesiones/entidades/Sesion';
import UsuarioNoReconocidoError from '../domain/sesiones/excepciones/UsuarioNoReconocidoError';
import CrearSesionConGoogleDTO, {CrearSesionConGoogle} from "../domain/sesiones/casos-uso/CrearSesionConGoogle";

@JsonController('/sesiones')
export class SesionController {
    constructor(
        private readonly crearSesion: CrearSesion,
        private readonly crearSesionConGoogle: CrearSesionConGoogle
    ) {
    }

    @Post('/')
    @OpenAPI({summary: 'Crear una Sesión autenticándose con usuario y contraseña'})
    @ResponseSchema(Sesion)
    async login(@Body() body: CrearSesionDTO) {
        try {
            return await this.crearSesion.execute(body);
        } catch (e) {
            if (e instanceof UsuarioNoReconocidoError) {
                throw new UnauthorizedError(e.message);
            }

            throw e;
        }
    }

    @Post('/')
    @OpenAPI({summary: 'Crear una Sesión autenticándose con Google'})
    @ResponseSchema(Sesion)
    async loginGoogle(@Body() body: CrearSesionConGoogleDTO) {
        try {
            return await this.crearSesionConGoogle.execute(body);
        } catch (e) {
            if (e instanceof UsuarioNoReconocidoError) {
                throw new UnauthorizedError(e.message);
            }

            throw e;
        }
    }
}

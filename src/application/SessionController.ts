import {
    Body,
    JsonController,
    Post,
    UnauthorizedError
} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import { CrearSession } from '../domain/sesiones/casos-uso/CrearSession';
import CrearSessionDTO from '../domain/sesiones/dtos/CrearSessionDTO';
import { Session } from '../domain/sesiones/entidades/Session';
import UsuarioNoReconocidoError from '../domain/sesiones/entidades/UsuarioNoReconocidoError';

@JsonController('/sessions')
export class SessionController {
    constructor(
        private readonly crearSesion: CrearSession
    ) {
    }

    @Post('/')
    @OpenAPI({summary: 'Create a session'})
    @ResponseSchema(Session)
    async getAll(@Body() body: CrearSessionDTO) {
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

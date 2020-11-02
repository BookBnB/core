import {IsOptional, IsString, MaxLength, IsNumber, IsPositive} from 'class-validator'
import {
    Body,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    QueryParams,
    UnauthorizedError
} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import CrearSessionDTO, { CrearSession } from '../domain/sesiones/casos-uso/CrearSession';
import { SessionDTO } from '../domain/sesiones/dtos/SessionDTO';
import UsuarioNoReconocidoError from '../domain/sesiones/entidades/UsuarioNoReconocidoError';

@JsonController('/sessions')
export class SessionController {
    constructor(
        private readonly crearSesion: CrearSession
    ) {
    }

    @Post('/')
    @OpenAPI({summary: 'Create a session'})
    @ResponseSchema(SessionDTO)
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

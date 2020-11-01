import {IsOptional, IsString, MaxLength, IsNumber, IsPositive} from 'class-validator'
import {
    Body,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    QueryParams
} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import CrearSessionDTO, { CrearSession } from '../domain/sesiones/casos-uso/CrearSession';
import { SessionDTO } from '../domain/sesiones/dtos/SessionDTO';

@JsonController('/session')
export class SessionController {
    constructor(
        private readonly crearSesion: CrearSession
    ) {
    }

    @Post('/')
    @OpenAPI({summary: 'Create a session'})
    @ResponseSchema(SessionDTO)
    getAll(@Body() body: CrearSessionDTO) {
        return this.crearSesion.execute(body);
    }
}

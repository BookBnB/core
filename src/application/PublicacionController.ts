import {Body, CurrentUser, Get, HttpCode, JsonController, Param, Post, Put, QueryParams, UseBefore} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import {CrearPublicacion, CrearPublicacionDTO} from "../domain/publicaciones/casos-uso/CrearPublicacion";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import {VerPublicacion} from "../domain/publicaciones/casos-uso/VerPublicacion";
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import {ConsultaDePublicaciones, ListarPublicaciones} from "../domain/publicaciones/casos-uso/ListarPublicaciones";
import Usuario from '../domain/usuarios/entidades/Usuario';

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/publicaciones')
export class PublicacionController {
    constructor(
        private readonly crearPublicacion: CrearPublicacion,
        private readonly verPublicacion: VerPublicacion,
        private readonly listarPublicaciones: ListarPublicaciones
    ) {
    }

    @Get('/')
    @OpenAPI({summary: 'Muestra una lista de publicaciones'})
    @ResponseSchema(PublicacionDTO)
    listar(@QueryParams() consulta: ConsultaDePublicaciones): Promise<PublicacionDTO[]> {
        return this.listarPublicaciones.execute(consulta)
    }

    @Get('/:id')
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Muestra una publicación'})
    mostrarUno(@Param('id') id: string): Promise<PublicacionDTO> {
        return this.verPublicacion.execute(id)
    }

    @Post('/')
    @HttpCode(201)
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Crea una publicación'})
    crear(@CurrentUser() usuario: Usuario, @Body() body: CrearPublicacionDTO): Promise<PublicacionDTO> {
        return this.crearPublicacion.execute(usuario, body)
    }

    @Put('/:id')
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Editar una publicación'})
    editar(@Body() body: CrearPublicacionDTO) {

    }
}

import {Authorized, Body, Get, HttpCode, JsonController, Param, Post, Put, QueryParams, UseAfter, UseBefore} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import {ConsultaConPaginacion} from "./helpers/helpers";
import {CrearPublicacion, CrearPublicacionDTO} from "../domain/publicaciones/casos-uso/CrearPublicacion";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import {VerPublicacion} from "../domain/publicaciones/casos-uso/VerPublicacion";
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import {ListarPublicaciones} from "../domain/publicaciones/casos-uso/ListarPublicaciones";

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
    listar(@QueryParams() consulta: ConsultaConPaginacion): Promise<PublicacionDTO[]> {
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
    crear(@Body() body: CrearPublicacionDTO): Promise<PublicacionDTO> {
        return this.crearPublicacion.execute(body)
    }

    @Put('/:id')
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Editar una publicación'})
    editar(@Body() body: CrearPublicacionDTO) {

    }
}

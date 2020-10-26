import {Body, Get, HttpCode, JsonController, Param, Post, QueryParams} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import {ConsultaConPaginacion} from "./helpers/helpers";
import CrearPublicacion, {CrearPublicacionDTO} from "../domain/publicaciones/casos-de-uso/CrearPublicacion";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";


@JsonController('/publicaciones')
export class PublicacionController {
    constructor(private crearPublicacion: CrearPublicacion) {
    }

    @Get('/')
    @OpenAPI({summary: 'Devuelve una lista de publicaciones'})
    @ResponseSchema(PublicacionDTO)
    listar(@QueryParams() consulta: ConsultaConPaginacion) {
    }

    @Get('/:id')
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Devuelve una publicación'})
    mostrarUno(@Param('id') id: string) {
        return {name: 'Publicación #' + id}
    }

    @Post('/')
    @HttpCode(201)
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Crea una publicación'})
    crear(@Body() body: CrearPublicacionDTO) {
        return this.crearPublicacion.execute(body)
    }
}

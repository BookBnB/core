import {Body, Get, HttpCode, JsonController, Param, Post, Put, QueryParams} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import {ConsultaConPaginacion} from "./helpers/helpers";
import {CrearPublicacion, CrearPublicacionDTO} from "../domain/publicaciones/casos-uso/CrearPublicacion";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";


@JsonController('/publicaciones')
export class PublicacionController {
    constructor(private readonly crearPublicacion: CrearPublicacion) {
    }

    @Get('/')
    @OpenAPI({summary: 'Muestra una lista de publicaciones'})
    @ResponseSchema(PublicacionDTO)
    listar(@QueryParams() consulta: ConsultaConPaginacion) {
    }

    @Get('/:id')
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Muestra una publicación'})
    mostrarUno(@Param('id') id: string) {
        return {name: 'Publicación #' + id}
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

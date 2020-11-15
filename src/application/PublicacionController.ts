import {
    Body,
    CurrentUser,
    Get,
    HttpCode,
    JsonController, NotFoundError,
    Param, Params,
    Post,
    Put,
    QueryParams,
    UseBefore
} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import {CrearPublicacion, CrearPublicacionDTO} from "../domain/publicaciones/casos-uso/CrearPublicacion";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import {VerPublicacion} from "../domain/publicaciones/casos-uso/VerPublicacion";
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import {ConsultaDePublicaciones, ListarPublicaciones} from "../domain/publicaciones/casos-uso/ListarPublicaciones";
import Usuario from '../domain/usuarios/entidades/Usuario';
import PublicacionInexistenteError from "../domain/publicaciones/excepciones/PublicacionInexistenteError";
import {IsUUID} from "class-validator";

class UUID {
    @IsUUID(4)
    public id!: string
}

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
    @OpenAPI({
        summary: 'Muestra una lista de publicaciones',
        parameters: [{in: "query", name: "coordenadas", style: "deepObject", explode: true}]
    })
    @ResponseSchema(PublicacionDTO)
    async listar(@QueryParams() consulta: ConsultaDePublicaciones): Promise<PublicacionDTO[]> {
        return this.listarPublicaciones.execute(consulta)
    }

    @Get('/:id')
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Muestra una publicación'})
    async mostrarUno(@Params() {id}: UUID): Promise<PublicacionDTO> {
        try {
            return await this.verPublicacion.execute(id)
        } catch (e) {
            if (e instanceof PublicacionInexistenteError) throw new NotFoundError(e.message)
            throw e
        }
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

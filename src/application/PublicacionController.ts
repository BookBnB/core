import {
    Authorized,
    Body,
    CurrentUser,
    Get,
    HttpCode,
    JsonController, NotFoundError,
    Params,
    Post,
    Put,
    QueryParams,
    UseBefore
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import UUID from '../domain/common/UUID';
import { CrearPublicacion, CrearPublicacionDTO } from "../domain/publicaciones/casos-uso/CrearPublicacion";
import { ConsultaDePublicaciones, BuscarPublicaciones } from "../domain/publicaciones/casos-uso/BuscarPublicaciones";
import { VerPublicacion } from "../domain/publicaciones/casos-uso/VerPublicacion";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import PublicacionInexistenteError from "../domain/publicaciones/excepciones/PublicacionInexistenteError";
import Usuario from '../domain/usuarios/entidades/Usuario';
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/publicaciones')
export class PublicacionController {
    constructor(
        private readonly crearPublicacion: CrearPublicacion,
        private readonly verPublicacion: VerPublicacion,
        private readonly listarPublicaciones: BuscarPublicaciones
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
    @Authorized("host")
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Crea una publicación'})
    crear(@CurrentUser() usuario: Usuario, @Body() body: CrearPublicacionDTO): Promise<PublicacionDTO> {
        return this.crearPublicacion.execute(usuario, body)
    }

    @Put('/:id')
    @Authorized("host")
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Editar una publicación'})
    editar(@Body() body: CrearPublicacionDTO) {

    }
}

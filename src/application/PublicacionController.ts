import {
    Authorized, Body,
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
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi';
import UUID from '../domain/common/UUID';
import {CrearPublicacion, CrearPublicacionDTO} from "../domain/publicaciones/casos-uso/CrearPublicacion";
import {ConsultaDePublicaciones, BuscarPublicaciones} from "../domain/publicaciones/casos-uso/BuscarPublicaciones";
import {VerPublicacion} from "../domain/publicaciones/casos-uso/VerPublicacion";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import PublicacionInexistenteError from "../domain/publicaciones/excepciones/PublicacionInexistenteError";
import Usuario from '../domain/usuarios/entidades/Usuario';
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import {PreguntarEnPublicacion} from "../domain/publicaciones/casos-uso/PreguntarEnPublicacion";
import PreguntaDTO from "../domain/publicaciones/dtos/PreguntaDTO";
import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import {ListarPreguntasDePublicacion} from "../domain/publicaciones/casos-uso/ListarPreguntasDePublicacion";
import {ResponderEnPublicacion} from "../domain/publicaciones/casos-uso/ResponderEnPublicacion";
import ConsultaConPaginacion from "../domain/common/ConsultaConPaginacion";
import ReservaDTO from "../domain/reservas/dtos/ReservaDTO";
import {
    ConsultaDeReservasPorPublicacion,
    ListarReservasDePublicacion
} from "../domain/reservas/casos-uso/ListarReservasDePublicacion";


class ResponderPreguntaParams {
    @IsUUID(4)
    public idPublicacion!: string

    @IsUUID(4)
    public idPregunta!: string
}

class PreguntaBody {
    @IsString() @IsNotEmpty()
    public descripcion!: string
}

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/publicaciones')
export class PublicacionController {
    constructor(
        private readonly crearPublicacion: CrearPublicacion,
        private readonly verPublicacion: VerPublicacion,
        private readonly buscarPublicaciones: BuscarPublicaciones,
        private readonly preguntarEnPublicacion: PreguntarEnPublicacion,
        private readonly listarPreguntasDePublicacion: ListarPreguntasDePublicacion,
        private readonly responderEnPublicacion: ResponderEnPublicacion,
        private readonly listarReservasDePublicacion: ListarReservasDePublicacion
    ) {
    }

    @Get('/')
    @OpenAPI({
        summary: 'Muestra una lista de publicaciones',
        parameters: [{in: "query", name: "coordenadas", style: "deepObject", explode: true}]
    })
    @ResponseSchema(PublicacionDTO, {isArray: true})
    async buscar(@QueryParams() consulta: ConsultaDePublicaciones): Promise<PublicacionDTO[]> {
        return this.buscarPublicaciones.execute(consulta)
    }

    @Get('/:id')
    @ResponseSchema(PublicacionDTO)
    @OpenAPI({summary: 'Muestra una publicación'})
    async mostrarUno(@CurrentUser() usuario: Usuario, @Params() {id}: UUID): Promise<PublicacionDTO> {
        try {
            const publicacion = await this.verPublicacion.execute(id)
            if(publicacion.esValida() || publicacion.perteneceA(usuario))
                return new PublicacionDTO(publicacion)
        } catch (e) {
            if (e instanceof PublicacionInexistenteError) throw new NotFoundError(e.message)
            throw e
        }
        throw new NotFoundError(`La publicación con id ${id} no existe.`)
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

    @Post('/:id/preguntas')
    @HttpCode(201)
    @ResponseSchema(PreguntaDTO)
    @OpenAPI({summary: 'Crea una pregunta en una publicación'})
    preguntar(@Params() {id: idPublicacion}: UUID, @CurrentUser() usuario: Usuario, @Body() {descripcion}: PreguntaBody): Promise<PreguntaDTO> {
        return this.preguntarEnPublicacion.execute(idPublicacion, usuario, descripcion)
    }

    @Get('/:id/preguntas')
    @HttpCode(200)
    @ResponseSchema(PreguntaDTO, {isArray: true})
    @OpenAPI({summary: 'Lista las preguntas de una publicación'})
    listarPreguntas(@Params() {id: idPublicacion}: UUID, @QueryParams() consulta: ConsultaConPaginacion): Promise<PreguntaDTO[]> {
        return this.listarPreguntasDePublicacion.execute(idPublicacion, consulta)
    }

    @Post('/:idPublicacion/preguntas/:idPregunta/respuesta')
    @HttpCode(201)
    @ResponseSchema(PreguntaDTO)
    @OpenAPI({summary: 'Responde una pregunta de una publicación'})
    responderPregunta(@Params() {idPublicacion, idPregunta}: ResponderPreguntaParams, @CurrentUser() usuario: Usuario, @Body() {descripcion}: PreguntaBody): Promise<PreguntaDTO> {
        return this.responderEnPublicacion.execute(idPublicacion, idPregunta, usuario, descripcion)
    }

    @Get('/:id/reservas')
    @HttpCode(200)
    @ResponseSchema(ReservaDTO, {isArray: true})
    @OpenAPI({summary: 'Muestra una lista de reservas asociadas a una publicación'})
    async listarReservas(
        @CurrentUser() usuario: Usuario,
        @Params() {id: publicacionId}: UUID,
        @QueryParams() consulta: ConsultaDeReservasPorPublicacion): Promise<ReservaDTO[]> {
        return this.listarReservasDePublicacion.execute(usuario, publicacionId, consulta)
    }
}

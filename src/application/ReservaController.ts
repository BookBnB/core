import {
    Authorized, BadRequestError,
    Body,
    CurrentUser,
    Delete,
    Get,
    HttpCode, InternalServerError,
    JsonController,
    Params,
    Post,
    Put,
    UseBefore
} from "routing-controllers";
import {OpenAPI, ResponseSchema} from "routing-controllers-openapi";
import {AprobarReserva} from "../domain/reservas/casos-uso/AprobarReserva";
import {CrearReserva, CrearReservaDTO} from "../domain/reservas/casos-uso/CrearReserva";
import {VerReserva} from "../domain/reservas/casos-uso/VerReserva";
import ReservaDTO from "../domain/reservas/dtos/ReservaDTO";
import Usuario from "../domain/usuarios/entidades/Usuario";
import ResultadoEvento from "./common/ResultadoEvento";
import AuthenticationMiddleware from "./middlewares/AuthenticationMiddleware";
import {RechazarReserva} from "../domain/reservas/casos-uso/RechazarReserva";
import {IsNotEmpty, IsString} from "class-validator";
import PublicacionConEstadoInvalidoError from "../domain/reservas/excepciones/PublicacionConEstadoInvalidoError";
import { CancelarReserva } from "../domain/reservas/casos-uso/CancelarReserva";

class IdReserva {
    @IsString() @IsNotEmpty()
    public id!: string

    constructor(id: string) {
        this.id = id;
    }
}

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/reservas')
export class ReservaController {
    constructor(
        private readonly crearReserva: CrearReserva,
        private readonly verReserva: VerReserva,
        private readonly aprobarReserva: AprobarReserva,
        private readonly rechazarReserva: RechazarReserva,
        private readonly cancelarReserva: CancelarReserva
    ) {
    }

    @Post('/')
    @HttpCode(201)
    @Authorized("guest")
    @ResponseSchema(ReservaDTO)
    @OpenAPI({summary: 'Crea una reserva para una publicación'})
    async crear(@CurrentUser() usuario: Usuario, @Body() body: CrearReservaDTO): Promise<ReservaDTO> {
        try {
            return await this.crearReserva.execute(usuario, body)
        } catch (e) {
            if (e instanceof PublicacionConEstadoInvalidoError)
                throw new BadRequestError(e.message)
            throw e
        }
    }

    @Get('/:id')
    @ResponseSchema(ReservaDTO)
    @OpenAPI({summary: 'Muestra una reserva'})
    async obtener(@Params() {id}: IdReserva): Promise<ReservaDTO> {
        return await this.verReserva.execute(id)
    }

    @Put('/:id/aprobacion')
    @ResponseSchema(ResultadoEvento)
    @OpenAPI({summary: 'Aprueba una reserva'})
    async aprobar(@Params() {id}: IdReserva): Promise<ResultadoEvento> {
        await this.aprobarReserva.execute(id)
        return ResultadoEvento.success()
    }

    @Put('/:id/rechazo')
    @ResponseSchema(ResultadoEvento)
    @OpenAPI({summary: 'Rechaza una reserva'})
    async rechazar(@Params() {id}: IdReserva): Promise<ResultadoEvento> {
        await this.rechazarReserva.execute(id)
        return ResultadoEvento.success()
    }

    @Put('/:id/cancelacion')
    @ResponseSchema(ResultadoEvento)
    @OpenAPI({summary: 'Cancela una reserva'})
    async cancelar(@Params() {id}: IdReserva): Promise<ResultadoEvento> {
        await this.cancelarReserva.execute(id)
        return ResultadoEvento.success()
    }
}

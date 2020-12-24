import {
    Authorized,
    Body,
    CurrentUser,
    Get,
    HttpCode,
    JsonController,
    Params,
    Post,
    Put,
    UseBefore
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { AprobarReserva } from "../domain/reservas/casos-uso/AprobarReserva";
import { CrearReserva, CrearReservaDTO } from "../domain/reservas/casos-uso/CrearReserva";
import { VerReserva } from "../domain/reservas/casos-uso/VerReserva";
import ReservaDTO from "../domain/reservas/dtos/ReservaDTO";
import Usuario from "../domain/usuarios/entidades/Usuario";
import ResultadoEvento from "./common/ResultadoEvento";
import AuthenticationMiddleware from "./middlewares/AuthenticationMiddleware";

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/reservas')
export class ReservaController {
    constructor(
        private readonly crearReserva: CrearReserva,
        private readonly verReserva: VerReserva,
        private readonly aprobarReserva: AprobarReserva
    ) {
    }

    @Post('/')
    @HttpCode(201)
    @Authorized("guest")
    @ResponseSchema(ReservaDTO)
    @OpenAPI({summary: 'Crea una reserva para una publicación'})
    async crear(@CurrentUser() usuario: Usuario, @Body() body: CrearReservaDTO): Promise<ReservaDTO> {
        return await this.crearReserva.execute(usuario, body)
    }

    @Get('/:id')
    @ResponseSchema(ReservaDTO)
    @OpenAPI({ summary: 'Muestra una reserva' })
    async obtener(@Params() { id }: any): Promise<ReservaDTO> {
        return await this.verReserva.execute(id)
    }

    @Put('/:id/aprobacion')
    @ResponseSchema(ReservaDTO)
    @OpenAPI({ summary: 'Muestra una reserva' })
    async aprobar(@Params() { id }: any): Promise<any> {
        await this.aprobarReserva.execute(id)
        return ResultadoEvento.success()
    }
}

import { IsEnum, IsObject } from "class-validator";
import { Body, HttpCode, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ConfirmarNuevaPublicacion } from "../domain/publicaciones/casos-uso/ConfirmarNuevaPublicacion";
import { ConfirmarAceptacionReserva } from "../domain/reservas/casos-uso/ConfirmarAceptacionReserva";
import { ConfirmarNuevaReserva } from "../domain/reservas/casos-uso/ConfirmarNuevaReserva";
import { UseCase } from "../domain/UseCase";
import ResultadoEvento from "./common/ResultadoEvento";

export enum TipoEvento {
    NUEVA_PUBLICACION = 'NUEVA_PUBLICACION',
    NUEVA_RESERVA = "NUEVA_RESERVA",
    RESERVA_ACEPTADA = "RESERVA_ACEPTADA",
    RESERVA_RECHAZADA = "RESERVA_RECHAZADA"
}

class CrearEventoDTO {
    @IsEnum(TipoEvento)
    public tipo!: TipoEvento

    @IsObject()
    public payload!: any
}

@OpenAPI({security: [{token: []}]})
@JsonController('/eventos')
export class EventoController {
    private eventos: any

    constructor(
        nuevaPublicacion: ConfirmarNuevaPublicacion,
        nuevaReserva: ConfirmarNuevaReserva,
        aceptarReserva: ConfirmarAceptacionReserva
    ) {
        this.eventos = {
            [TipoEvento.NUEVA_PUBLICACION]: nuevaPublicacion,
            [TipoEvento.NUEVA_RESERVA]: nuevaReserva,
            [TipoEvento.RESERVA_ACEPTADA]: aceptarReserva
        }
    }

    @Post('/')
    @HttpCode(201)
    @ResponseSchema(ResultadoEvento)
    @OpenAPI({summary: 'Crea un evento'})
    async crear(@Body() body: CrearEventoDTO) {
        const evento: UseCase = this.eventos[body.tipo]

        if (evento) {
            await evento.execute(body.payload);
        }

        return ResultadoEvento.success()
    }
}

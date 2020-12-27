import {IsEnum, IsObject} from "class-validator";
import { Body, HttpCode, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ConfirmarNuevaPublicacion } from "../domain/publicaciones/casos-uso/ConfirmarNuevaPublicacion";
import { ConfirmarAceptacionReserva } from "../domain/reservas/casos-uso/ConfirmarAceptacionReserva";
import { ConfirmarNuevaReserva } from "../domain/reservas/casos-uso/ConfirmarNuevaReserva";
import { UseCase } from "../domain/UseCase";
import ResultadoEvento from "./common/ResultadoEvento";
import {JSONSchema} from "class-validator-jsonschema";
import {RechazarNuevaPublicacion} from "../domain/publicaciones/casos-uso/RechazarNuevaPublicacion";
import {RechazarReserva} from "../domain/reservas/casos-uso/RechazarReserva";

export enum TipoEvento {
    NUEVA_PUBLICACION = 'NUEVA_PUBLICACION',
    PUBLICACION_RECHAZADA = 'PUBLICACION_RECHAZADA',
    NUEVA_RESERVA = "NUEVA_RESERVA",
    RESERVA_ACEPTADA = "RESERVA_ACEPTADA",
    RESERVA_RECHAZADA = "RESERVA_RECHAZADA"
}

class Payload {
    [key: string]: any
}

@JSONSchema({properties: {payload: {type: "object", $ref: ""}}})
class CrearEventoDTO {
    @IsEnum(TipoEvento)
    public tipo!: TipoEvento

    @IsObject()
    public payload!: Payload
}

@OpenAPI({security: [{token: []}]})
@JsonController('/eventos')
export class EventoController {
    private readonly eventos: any

    constructor(
        confirmarNuevaPublicacion: ConfirmarNuevaPublicacion,
        rechazarNuevaPublicacion: RechazarNuevaPublicacion,
        confirmarNuevaReserva: ConfirmarNuevaReserva,
        rechazarReserva: RechazarReserva,
        aceptarReserva: ConfirmarAceptacionReserva
    ) {
        this.eventos = {
            [TipoEvento.NUEVA_PUBLICACION]: confirmarNuevaPublicacion,
            [TipoEvento.PUBLICACION_RECHAZADA]: rechazarNuevaPublicacion,
            [TipoEvento.NUEVA_RESERVA]: confirmarNuevaReserva,
            [TipoEvento.RESERVA_ACEPTADA]: aceptarReserva,
            [TipoEvento.RESERVA_RECHAZADA]: rechazarReserva
        }
    }

    @Post('/')
    @HttpCode(200)
    @ResponseSchema(ResultadoEvento)
    @OpenAPI({summary: 'Notifica un evento'})
    async notificar(@Body() body: CrearEventoDTO) {
        const evento: UseCase = this.eventos[body.tipo]

        if (evento) {
            await evento.execute(body.payload);
        }

        return ResultadoEvento.success()
    }
}

import {IsEnum, IsObject} from "class-validator";
import {Body, HttpCode, JsonController, Post} from "routing-controllers";
import {OpenAPI, ResponseSchema} from "routing-controllers-openapi";
import {ConfirmarPublicacionCreada} from "../domain/publicaciones/casos-uso/ConfirmarPublicacionCreada";
import {ConfirmarAceptacionReserva} from "../domain/reservas/casos-uso/ConfirmarAceptacionReserva";
import {ConfirmarReservaCreada} from "../domain/reservas/casos-uso/ConfirmarReservaCreada";
import {UseCase} from "../domain/UseCase";
import ResultadoEvento from "./common/ResultadoEvento";
import {JSONSchema} from "class-validator-jsonschema";
import {ConfirmarRechazoPublicacion} from "../domain/publicaciones/casos-uso/ConfirmarRechazoPublicacion";
import {ConfirmarRechazoReserva} from "../domain/reservas/casos-uso/ConfirmarRechazoReserva";
import { ConfirmarCancelacionReserva } from "../domain/reservas/casos-uso/ConfirmarCancelacionReserva";

export enum TipoEvento {
    PUBLICACION_CREADA = 'PUBLICACION_CREADA',
    RESERVA_CREADA = "RESERVA_CREADA",
    RESERVA_ACEPTADA = "RESERVA_ACEPTADA",
    RESERVA_RECHAZADA = "RESERVA_RECHAZADA",
    PUBLICACION_CREACION_FALLIDA = 'PUBLICACION_CREACION_FALLIDA',
    RESERVA_CREACION_FALLIDA = "RESERVA_CREACION_FALLIDA",
    RESERVA_ACEPTACION_FALLIDA = "RESERVA_ACEPTACION_FALLIDA",
    RESERVA_RECHAZO_FALLIDO = "RESERVA_RECHAZO_FALLIDO",
    RESERVA_CANCELACION_FALLIDA = "RESERVA_CANCELACION_FALLIDA",
    RESERVA_CANCELADA = "RESERVA_CANCELADA"
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
        confirmarPublicacionCreada: ConfirmarPublicacionCreada,
        confirmarReservaCreada: ConfirmarReservaCreada,
        aceptarReserva: ConfirmarAceptacionReserva,
        rechazarReserva: ConfirmarRechazoReserva,
        rechazarNuevaPublicacion: ConfirmarRechazoPublicacion,
        cancelarReserva: ConfirmarCancelacionReserva
    ) {
        this.eventos = {
            [TipoEvento.PUBLICACION_CREADA]: confirmarPublicacionCreada,
            [TipoEvento.RESERVA_CREADA]: confirmarReservaCreada,
            [TipoEvento.RESERVA_ACEPTADA]: aceptarReserva,
            [TipoEvento.RESERVA_RECHAZADA]: rechazarReserva,
            [TipoEvento.PUBLICACION_CREACION_FALLIDA]: rechazarNuevaPublicacion,
            [TipoEvento.RESERVA_CREACION_FALLIDA]: rechazarReserva,
            [TipoEvento.RESERVA_CANCELADA]: cancelarReserva
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

import {IsEnum, IsObject, ValidateNested} from "class-validator";
import { Body, HttpCode, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ConfirmarNuevaPublicacion } from "../domain/publicaciones/casos-uso/ConfirmarNuevaPublicacion";
import { ConfirmarAceptacionReserva } from "../domain/reservas/casos-uso/ConfirmarAceptacionReserva";
import { ConfirmarNuevaReserva } from "../domain/reservas/casos-uso/ConfirmarNuevaReserva";
import { UseCase } from "../domain/UseCase";
import ResultadoEvento from "./common/ResultadoEvento";
import {Type} from "class-transformer";
import {JSONSchema} from "class-validator-jsonschema";
import Direccion from "../domain/lugares/entidades/Direccion";

export enum TipoEvento {
    NUEVA_PUBLICACION = 'NUEVA_PUBLICACION',
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

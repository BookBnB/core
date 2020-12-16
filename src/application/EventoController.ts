import { IsEnum, IsObject } from "class-validator";
import { BadRequestError, Body, HttpCode, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { EventoNuevaPublicacion } from "../domain/eventos/casos-uso/EventoNuevaPublicacion";
import { TipoEvento } from "../domain/eventos/entidades/TipoEvento";
import { UseCase } from "../domain/UseCase";
import Resultado from "./common/Resultado";

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
        eventoNuevaPublicacion: EventoNuevaPublicacion
    ) {
        this.eventos = {
            [TipoEvento.NUEVA_PUBLICACION]: eventoNuevaPublicacion
        }
    }

    @Post('/')
    @HttpCode(201)
    @ResponseSchema(Resultado)
    @OpenAPI({summary: 'Crea un evento'})
    async crear(@Body() body: CrearEventoDTO) {
        const evento: UseCase = this.eventos[body.tipo]

        if (!evento) {
            throw new BadRequestError('Evento no reconocido')
        }

        await evento.execute(body.payload);

        return Resultado.success()
    }
}

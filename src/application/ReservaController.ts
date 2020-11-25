import {
    Authorized,
    BadRequestError,
    Body,
    CurrentUser,
    HttpCode,
    JsonController,
    Post,
    UseBefore
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { CrearReserva, CrearReservaDTO } from "../domain/reservas/casos-uso/CrearReserva";
import ReservaDTO from "../domain/reservas/dtos/ReservaDTO";
import FechasInvertidasError from "../domain/reservas/excepciones/FechasInvertidasError";
import Usuario from "../domain/usuarios/entidades/Usuario";
import AuthenticationMiddleware from "./middlewares/AuthenticationMiddleware";

@OpenAPI({security: [{token: []}]})
@UseBefore(AuthenticationMiddleware)
@JsonController('/reservas')
export class ReservaController {
    constructor(
        private readonly crearReserva: CrearReserva
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
            if (e instanceof FechasInvertidasError) {
                throw new BadRequestError(e.message);
            }

            throw e;
        }
    }
}

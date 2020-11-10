import {Body, JsonController, Post, Req, UseBefore} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import {BuscarDirecciones} from "../domain/lugares/casos-uso/BuscarDirecciones";
import Direccion from "../domain/lugares/entidades/Direccion";
import {Request} from "express"
import ConsultaDeLugar from "../domain/lugares/casos-uso/ConsultaDeLugar";

@UseBefore(AuthenticationMiddleware)
@OpenAPI({security: [{token: []}]})
@JsonController('/lugares')
export class LugarController {
    constructor(private readonly buscarDirecciones: BuscarDirecciones) {
    }

    @Post('/direcciones/consulta')
    @OpenAPI({summary: 'Muestra una lista de posibles direcciones que coinciden con la búsqueda'})
    @ResponseSchema(Direccion, {isArray: true})
    listar(@Body() consulta: ConsultaDeLugar, @Req() request: Request): Promise<Direccion[]> {
        const ip: string = <string>(request.headers['x-forwarded-for'] || request.connection.remoteAddress);
        return this.buscarDirecciones.execute(consulta, ip)
    }
}

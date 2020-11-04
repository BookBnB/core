import {Body, JsonController, Post, Req, UseBefore} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import {BuscarDirecciones, ConsultaDeDireccion} from "../domain/direcciones/casos-uso/BuscarDirecciones";
import Direccion from "../domain/direcciones/entidades/Direccion";
import {Request} from "express"

@UseBefore(AuthenticationMiddleware)
@OpenAPI({security: [{token: []}]})
@JsonController('/direcciones')
export class DireccionController {
    constructor(private readonly buscarDirecciones: BuscarDirecciones) {
    }

    @Post('/consulta')
    @OpenAPI({summary: 'Muestra una lista de posibles direcciones que coinciden con la búsqueda'})
    @ResponseSchema(Direccion, {isArray: true})
    listar(@Body() consulta: ConsultaDeDireccion, @Req() request: Request): Promise<Direccion[]> {
        const ip: string = <string>(request.headers['x-forwarded-for'] || request.connection.remoteAddress);
        return this.buscarDirecciones.execute(consulta, ip)
    }
}

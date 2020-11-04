import {Body, JsonController, Post, UseBefore} from 'routing-controllers'
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi'
import AuthenticationMiddleware from './middlewares/AuthenticationMiddleware';
import {BuscarDirecciones, ConsultaDeDireccion} from "../domain/direcciones/casos-uso/BuscarDirecciones";
import Direccion from "../domain/direcciones/entidades/Direccion";

@UseBefore(AuthenticationMiddleware)
@JsonController('/direcciones')
export class DireccionController {
    constructor(private readonly buscarDirecciones: BuscarDirecciones) {
    }

    @Post('/consulta')
    @OpenAPI({summary: 'Muestra una lista de posibles direcciones que coinciden con la búsqueda'})
    @ResponseSchema(Direccion, {isArray: true})
    listar(@Body() consulta: ConsultaDeDireccion): Promise<Direccion[]> {
        return this.buscarDirecciones.execute(consulta)
    }
}

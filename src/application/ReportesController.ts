import { Get, JsonController, QueryParams } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { ReporteCantidadPublicaciones } from "../domain/reportes/casos-uso/ReporteCantidadPublicaciones";
import { ParametrosReporte } from "../domain/reportes/entidades/ParametrosReporte";
import Reporte from "../domain/reportes/entidades/Reporte";

@OpenAPI({security: [{token: []}]})
@JsonController('/reportes')
export class ReportesController {
    constructor(
        private readonly reporteCantidadPublicaciones: ReporteCantidadPublicaciones
    ) {}

    @Get('/publicaciones')
    async publicaciones(@QueryParams() params: ParametrosReporte): Promise<Reporte<number>> {
        return await this.reporteCantidadPublicaciones.execute(params)
    }
}
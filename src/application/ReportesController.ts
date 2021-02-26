import { Get, JsonController, QueryParams } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { ReporteCantidadPublicaciones } from "../domain/reportes/casos-uso/ReporteCantidadPublicaciones";
import { ReporteCantidadReservas } from "../domain/reportes/casos-uso/ReporteCantidadReservas";
import { ParametrosReporte } from "../domain/reportes/entidades/ParametrosReporte";
import Reporte from "../domain/reportes/entidades/Reporte";

@OpenAPI({security: [{token: []}]})
@JsonController('/reportes')
export class ReportesController {
    constructor(
        private readonly reporteCantidadPublicaciones: ReporteCantidadPublicaciones,
        private readonly reporteCantidadReservas: ReporteCantidadReservas
    ) {}

    @Get('/publicaciones')
    async publicaciones(@QueryParams() params: ParametrosReporte): Promise<Reporte<number>> {
        return this.reporteCantidadPublicaciones.execute(params)
    }

    @Get('/reservas')
    async reservas(@QueryParams() params: ParametrosReporte): Promise<Reporte<number>> {
        return this.reporteCantidadReservas.execute(params)
    }
}
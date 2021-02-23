import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import { UseCase } from "../../UseCase";
import { ParametrosReporte } from "../entidades/ParametrosReporte";
import Reporte from "../entidades/Reporte";

export class ReporteCantidadPublicaciones implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) { }

    public async execute(params: ParametrosReporte): Promise<Reporte<number>> {
        const res = await this.publicaciones.publicacionesCreadasPorDia(params.fechaInicio, params.fechaFin)

        return {
            nombre: 'PublicacionesPorDia',
            datos: res.map((val) => {
                return {
                    clave: val.fechaCreacion,
                    valor: parseInt(val.cantidad)
                }
            })
        }
    }
}
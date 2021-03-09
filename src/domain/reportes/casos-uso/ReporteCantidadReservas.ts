import IReservaRepositorio from "../../reservas/repositorios/ReservaRepositorio";
import { UseCase } from "../../UseCase";
import { ParametrosReporte } from "../entidades/ParametrosReporte";
import Reporte from "../entidades/Reporte";

export class ReporteCantidadReservas implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio
    ) { }

    public async execute(params: ParametrosReporte): Promise<Reporte<number>> {
        const res = await this.reservas.reservasCreadasPorDia(params.fechaInicio, params.fechaFin)

        return {
            nombre: 'ReservasPorDia',
            datos: res.map((val) => {
                return {
                    clave: val.fechaCreacion,
                    valor: parseInt(val.cantidad)
                }
            })
        }
    }
}
import IReservaRepositorio from "../../reservas/repositorios/ReservaRepositorio";
import { UseCase } from "../../UseCase";
import { ParametrosReporte } from "../entidades/ParametrosReporte";
import Reporte from "../entidades/Reporte";

export class ReporteReservasActivas implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio
    ) { }

    public async execute(params: ParametrosReporte): Promise<Reporte<number>> {
        const res = await this.reservas.reservasActivas(params.fechaInicio, params.fechaFin)

        return {
            nombre: 'ReservasActivas',
            datos: res.map((val) => {
                return {
                    clave: val.fecha,
                    valor: parseInt(val.cantidad)
                }
            })
        }
    }
}
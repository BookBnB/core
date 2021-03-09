import IServicioPagos from "../../common/servicios/ServicioPagos";
import { UseCase } from "../../UseCase";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class CancelarReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly servicioPagos: IServicioPagos
    ) {
    }

    async execute(id: string): Promise<void> {
        const reserva = await this.reservas.obtener(id)

        await this.servicioPagos.cancelarReserva(reserva)
    }
}

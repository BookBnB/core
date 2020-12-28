import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import {UseCase} from "../../UseCase";
import IServicioPagos from "../../common/servicios/ServicioPagos";

export class RechazarReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly servicioPagos: IServicioPagos
        ) {
    }

    async execute(reservaId: string) {
        const reserva = await this.reservas.obtener(reservaId)

        await this.servicioPagos.rechazarReserva(reserva)
    }
}

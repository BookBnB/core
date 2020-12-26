import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import { UseCase } from "../../UseCase";

interface ParametrosConfirmarNuevaReserva {
    reservaId: string
}

export class ConfirmarNuevaReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute(params: ParametrosConfirmarNuevaReserva) {
        const reserva = await this.reservas.obtener(params.reservaId)

        reserva.confirmarCreacion()

        await this.reservas.guardar(reserva)
    }
}

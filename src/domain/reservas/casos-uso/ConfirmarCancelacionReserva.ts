import {UseCase} from "../../UseCase";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class ConfirmarCancelacionReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute({reservaId}: { reservaId: string }) {
        const reserva = await this.reservas.obtener(reservaId)

        reserva.cancelar()

        await this.reservas.guardar(reserva)
    }
}

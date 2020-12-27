import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import {UseCase} from "../../UseCase";

export class RechazarReserva implements UseCase {
    constructor(private readonly reservas: IReservaRepositorio) {
    }

    async execute({reservaId}: { reservaId: string }) {
        const reserva = await this.reservas.obtener(reservaId)

        reserva.rechazar()

        await this.reservas.guardar(reserva)
    }
}

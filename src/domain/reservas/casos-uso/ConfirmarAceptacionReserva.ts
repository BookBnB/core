import { UseCase } from "../../UseCase";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class ConfirmarAceptacionReserva implements UseCase {
    constructor(
       private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute({ reservaId }: { reservaId: string }) {
        const reserva = await this.reservas.obtener(reservaId)

        reserva.aceptar()
        // TODO: rechazar las reservas que eran para los mismos días

        await this.reservas.guardar(reserva)
    }
}

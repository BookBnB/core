import {UseCase} from "../../UseCase";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class ConfirmarAceptacionReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute({reservaId}: { reservaId: string }) {
        const reserva = await this.reservas.obtenerConReservasAnidadas(reservaId)

        reserva.aceptar()

        // Guardo las reservas anidadas porque puede ser que se haya
        // rechazado alguna por solapamiento de fechas.
        for (const reservaAGuardar of reserva.getPublicacion().getReservas()) {
            await this.reservas.guardar(reservaAGuardar)
        }
    }
}

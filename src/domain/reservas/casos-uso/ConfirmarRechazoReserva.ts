import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import {UseCase} from "../../UseCase";
import IServicioNotificaciones from "../../common/servicios/ServicioNotificaciones";

export class ConfirmarRechazoReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly notificaciones: IServicioNotificaciones
    ) {
    }

    async execute({reservaId}: { reservaId: string }) {
        const reserva = await this.reservas.obtener(reservaId)

        await reserva.rechazar(this.notificaciones)

        await this.reservas.guardar(reserva)
    }
}

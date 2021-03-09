import {UseCase} from "../../UseCase";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import IServicioNotificaciones from "../../common/servicios/ServicioNotificaciones";

export class ConfirmarCancelacionReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly notificaciones: IServicioNotificaciones
    ) {
    }

    async execute({reservaId}: { reservaId: string }) {
        const reserva = await this.reservas.obtener(reservaId)

        await reserva.cancelar(this.notificaciones)

        await this.reservas.guardar(reserva)
    }
}

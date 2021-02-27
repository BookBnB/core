import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import { UseCase } from "../../UseCase";
import IServicioNotificaciones from "../../common/servicios/ServicioNotificaciones";

interface ParametrosConfirmarNuevaReserva {
    reservaId: string
}

export class ConfirmarReservaCreada implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly notificaciones: IServicioNotificaciones
    ) {
    }

    async execute(params: ParametrosConfirmarNuevaReserva) {
        const reserva = await this.reservas.obtener(params.reservaId)

        await reserva.confirmarCreacion(this.notificaciones)

        await this.reservas.guardar(reserva)
    }
}

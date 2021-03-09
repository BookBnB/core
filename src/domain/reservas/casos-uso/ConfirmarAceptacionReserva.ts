import {UseCase} from "../../UseCase";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import IServicioNotificaciones from "../../common/servicios/ServicioNotificaciones";

export class ConfirmarAceptacionReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly notificaciones: IServicioNotificaciones
    ) {
    }

    async execute({reservaId}: { reservaId: string }) {
        const reserva = await this.reservas.obtenerConReservasAnidadas(reservaId)

        await reserva.aceptar(this.notificaciones)

        // Guardo las reservas anidadas porque puede ser que se haya
        // rechazado alguna por solapamiento de fechas.
        for (const reservaAGuardar of reserva.getPublicacion().getReservas()) {
            await this.reservas.guardar(reservaAGuardar)
        }
    }
}

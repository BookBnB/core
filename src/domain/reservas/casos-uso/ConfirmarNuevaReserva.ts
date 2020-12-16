import { EstadoReserva } from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import { UseCase } from "../../UseCase";

export class ConfirmarNuevaReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute(params: any) {
        const reserva = await this.reservas.obtener(params.idReserva)

        reserva.estado = EstadoReserva.PENDIENTE_ACEPTACION

        await this.reservas.guardar(reserva)
    }
}

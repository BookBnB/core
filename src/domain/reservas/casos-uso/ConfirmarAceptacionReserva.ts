import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import { UseCase } from "../../UseCase";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

interface ParametrosAceptarReserva {
    reservaId: string
}

export class ConfirmarAceptacionReserva implements UseCase {
    constructor(
       private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute(params: ParametrosAceptarReserva) {
        const reserva = await this.reservas.obtener(params.reservaId)

        reserva.aceptar()

        await this.reservas.guardar(reserva)
    }
}
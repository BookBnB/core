import IServicioPagos from "../../common/servicios/ServicioPagos";
import PublicacionBloqueadaError from "../../publicaciones/excepciones/PublicacionBloqueadaError";
import { UseCase } from "../../UseCase";
import Usuario from "../../usuarios/entidades/Usuario";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class AprobarReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly servicioPagos: IServicioPagos
    ) {
    }

    async execute(id: string, usuario: Usuario): Promise<void> {
        const reserva = await this.reservas.obtener(id)

        if (reserva.publicacion.bloqueadaPara(usuario)) {
            throw new PublicacionBloqueadaError()
        }

        await this.servicioPagos.aprobarReserva(reserva)
    }
}

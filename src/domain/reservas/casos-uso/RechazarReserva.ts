import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import {UseCase} from "../../UseCase";
import IServicioPagos from "../../common/servicios/ServicioPagos";
import PublicacionBloqueadaError from "../../publicaciones/excepciones/PublicacionBloqueadaError";
import Usuario from "../../usuarios/entidades/Usuario";

export class RechazarReserva implements UseCase {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly servicioPagos: IServicioPagos
        ) {
    }

    async execute(reservaId: string, usuario: Usuario) {
        const reserva = await this.reservas.obtener(reservaId)

        if (reserva.publicacion.bloqueadaPara(usuario)) {
            throw new PublicacionBloqueadaError()
        }

        await this.servicioPagos.rechazarReserva(reserva)
    }
}

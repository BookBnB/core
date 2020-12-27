import IServicioPagos from "../../domain/common/servicios/ServicioPagos";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import Reserva from '../../domain/reservas/entidades/Reserva';
import Usuario from '../../domain/usuarios/entidades/Usuario';
import ServicioExterno from './ServicioExterno';

export default class ServicioPagos extends ServicioExterno implements IServicioPagos {
    constructor(private readonly url: string) {
        super()
    }

    async crearPublicacion(publicacion: Publicacion): Promise<void> {
        await this.post(`${this.url}/v1/publicaciones`, {
            publicacionId: publicacion.id,
            usuarioId: publicacion.anfitrion.id,
            precioPorNoche: publicacion.precioPorNoche
        })
    }

    async aprobarReserva(reserva: Reserva): Promise<void> {
        await this.put(`${this.url}/v1/reservas/${reserva.id}/aprobacion`, {
            reservaId: reserva.id,
            huespedId: reserva.huesped.id,
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin,
            publicacionContratoId: reserva.publicacion.contratoId,
            anfitrionId: reserva.publicacion.anfitrion.id
        })
    }

    async crearReserva(reserva: Reserva): Promise<void> {
        await this.post(`${this.url}/v1/reservas`, {
            reservaId: reserva.id,
            publicacionContratoId: reserva.publicacion.contratoId,
            huespedId: reserva.huesped.id,
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin
        })
    }

    async crearBilletera(usuario: Usuario): Promise<void> {
        await this.post(`${this.url}/v1/billeteras/${usuario.id}`)
    }
}

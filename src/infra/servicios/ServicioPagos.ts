import IServicioPagos from "../../domain/common/servicios/ServicioPagos";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import Reserva from '../../domain/reservas/entidades/Reserva';
import Usuario from '../../domain/usuarios/entidades/Usuario';
import ApiExterna from './ApiExterna';

export default class ServicioPagos extends ApiExterna implements IServicioPagos {
    constructor(private readonly url: string) {
        super()
    }

    async crearBilletera(usuario: Usuario): Promise<void> {
        await this.post(`${this.url}/v1/billeteras`, {id: usuario.id})
    }

    async crearPublicacion(publicacion: Publicacion): Promise<void> {
        await this.post(`${this.url}/v1/publicaciones`, {
            publicacionId: publicacion.id,
            usuarioId: publicacion.anfitrion.id,
            precioPorNoche: publicacion.precioPorNoche
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

    async rechazarReserva(reserva: Reserva): Promise<void> {
        await this.put(`${this.url}/v1/reservas/${reserva.id}/rechazo`, {
            reservaId: reserva.id,
            huespedId: reserva.huesped.id,
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin,
            publicacionContratoId: reserva.publicacion.contratoId,
            anfitrionId: reserva.publicacion.anfitrion.id
        })
    }

    async cancelarReserva(reserva: Reserva): Promise<void> {
        await this.delete(`${this.url}/v1/reservas/${reserva.id}`, {
            data: {
                reservaId: reserva.id,
                publicacionContratoId: reserva.publicacion.contratoId,
                huespedId: reserva.huesped.id,
                anfitrionId: reserva.publicacion.anfitrion.id,
                fechaInicio: reserva.fechaInicio,
                fechaFin: reserva.fechaFin
            }
        })
    }
}

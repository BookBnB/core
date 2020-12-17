import axios from 'axios';
import IServicioPagos from "../../domain/common/servicios/ServicioPagos";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import Reserva from '../../domain/reservas/entidades/Reserva';

export default class ServicioPagos implements IServicioPagos {
    constructor(private readonly url: string) {
    }

    async crearPublicacion(publicacion: Publicacion): Promise<void> {
        return axios.post(`${this.url}/v1/publicaciones`, {
            publicacionId: publicacion.id,
            usuarioId: publicacion.anfitrion.id,
            precioPorNoche: publicacion.precioPorNoche
        })
    }

    async aceptarReserva(reserva: Reserva): Promise<void> {
        return axios.put(`${this.url}/v1/reservas/${reserva.id}/aprobacion`, {
            reservaId: reserva.id,
            huespedId: reserva.huesped.id,
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin,
            publicacionContratoId: reserva.publicacion.contratoId,
            anfitrionId: reserva.publicacion.anfitrion.id
        })
    }

    async crearReserva(reserva: Reserva): Promise<void> {
        return axios.post(`${this.url}/v1/reservas`, {
            reservaId: reserva.id,
            publicacionContratoId: reserva.publicacion.contratoId,
            huespedId: reserva.huesped.id,
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin
        })
    }
}

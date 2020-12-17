import Publicacion from "../../publicaciones/entidades/Publicacion";
import Reserva from "../../reservas/entidades/Reserva";

export default interface IServicioPagos {
    crearPublicacion(publicacion: Publicacion): Promise<void>
    aceptarReserva(reserva: Reserva): Promise<void>
    crearReserva(reserva: Reserva): Promise<void>;
}
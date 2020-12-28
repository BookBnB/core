import Publicacion from "../../publicaciones/entidades/Publicacion";
import Reserva from "../../reservas/entidades/Reserva";
import Usuario from "../../usuarios/entidades/Usuario";

export default interface IServicioPagos {
    crearBilletera(usuario: Usuario): Promise<void>;
    crearPublicacion(publicacion: Publicacion): Promise<void>
    crearReserva(reserva: Reserva): Promise<void>;
    aprobarReserva(reserva: Reserva): Promise<void>
    rechazarReserva(reserva: Reserva): Promise<void>;
}

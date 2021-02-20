import EstadoDePublicacion from "./EstadoDePublicacion";
import PublicacionConEstadoInvalidoError from "../../../reservas/excepciones/PublicacionConEstadoInvalidoError";
import Usuario from "../../../usuarios/entidades/Usuario";
import {CrearReservaDTO} from "../../../reservas/casos-uso/CrearReserva";
import Publicacion, {EstadoPublicacion} from "../Publicacion";
import Reserva from "../../../reservas/entidades/Reserva";

export default class PendienteDeCreacion extends EstadoDePublicacion {
    crearReserva(huesped: Usuario, body: CrearReservaDTO, publicacion: Publicacion): Reserva {
        throw PublicacionConEstadoInvalidoError.noSePuedeCrearReserva('Pendiente de creación');
    }

    esValida(): boolean {
        return false;
    }

    static get DISCRIMINANTE(): string {
        return EstadoPublicacion.PENDIENTE_DE_CREACION;
    }
}

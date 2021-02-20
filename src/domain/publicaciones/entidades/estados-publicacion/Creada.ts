import EstadoDePublicacion from "./EstadoDePublicacion";
import Usuario from "../../../usuarios/entidades/Usuario";
import {CrearReservaDTO} from "../../../reservas/casos-uso/CrearReserva";
import Reserva from "../../../reservas/entidades/Reserva";
import Publicacion, {EstadoPublicacion} from "../Publicacion";

export default class Creada extends EstadoDePublicacion {
    public crearReserva(huesped: Usuario, body: CrearReservaDTO, publicacion: Publicacion): Reserva {
        return new Reserva({
            fechaInicio: body.fechaInicio,
            fechaFin: body.fechaFin,
            precioPorNoche: publicacion.precioPorNoche,
            publicacion: publicacion,
            huesped,
        });
    }

    esValida(): boolean {
        return true;
    }

    static get DISCRIMINANTE(): string {
        return EstadoPublicacion.CREADA
    }
}

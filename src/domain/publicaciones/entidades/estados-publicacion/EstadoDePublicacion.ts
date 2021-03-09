import Usuario from "../../../usuarios/entidades/Usuario";
import {CrearReservaDTO} from "../../../reservas/casos-uso/CrearReserva";
import Reserva from "../../../reservas/entidades/Reserva";
import Publicacion from "../Publicacion";

export default abstract class EstadoDePublicacion {

    abstract crearReserva(huesped: Usuario, body: CrearReservaDTO, publicacion: Publicacion): Reserva;

    abstract esValida(): boolean

    static get DISCRIMINANTE(): string {
        throw new Error('Método no implementado')
    }

    public toString(): string {
        return (this.constructor as any).DISCRIMINANTE;
    }
}

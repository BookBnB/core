import { Sesion } from "../entidades/Sesion";
import CrearSesionDTO from "../casos-uso/CrearSesion";

export default interface IServicioUsuarios {
    crearSesion(body: CrearSesionDTO): Promise<Sesion>;
}

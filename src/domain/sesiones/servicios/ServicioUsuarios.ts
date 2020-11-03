import CrearSesionDTO from "../dtos/CrearSesionDTO";
import { Sesion } from "../entidades/Sesion";

export default interface IServicioUsuarios {
    crearSesion(body: CrearSesionDTO): Promise<Sesion>;
}

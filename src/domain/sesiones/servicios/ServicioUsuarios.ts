import { Sesion } from "../entidades/Sesion";
import CrearSesionDTO from "../casos-uso/CrearSesion";
import CrearSesionConGoogleDTO from "../casos-uso/CrearSesionConGoogle";

export default interface IServicioUsuarios {
    crearSesion(body: CrearSesionDTO): Promise<Sesion>;

    crearSesionConGoogle(body: CrearSesionConGoogleDTO): Promise<Sesion>;
}

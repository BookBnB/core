import { Sesion } from "../entidades/Sesion";
import CrearSesionDTO from "../casos-uso/CrearSesion";
import CrearSesionConGoogleDTO from "../casos-uso/CrearSesionConGoogle";
import { CrearUsuarioDTO } from "../../usuarios/casos-uso/CrearUsuario";
import UsuarioDTO from "../../usuarios/dtos/UsuarioDTO";

export default interface IServicioUsuarios {
    crearSesion(body: CrearSesionDTO): Promise<Sesion>;

    crearSesionConGoogle(body: CrearSesionConGoogleDTO): Promise<Sesion>;

    crearUsuario(body: CrearUsuarioDTO): Promise<UsuarioDTO>
}

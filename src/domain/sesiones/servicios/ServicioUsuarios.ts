import { Sesion } from "../entidades/Sesion";
import CrearSesionDTO from "../casos-uso/CrearSesion";
import CrearSesionConGoogleDTO from "../casos-uso/CrearSesionConGoogle";
import { CrearUsuarioDTO } from "../../usuarios/casos-uso/CrearUsuario";
import UsuarioDTO from "../../usuarios/dtos/UsuarioDTO";
import {Servidor} from "../../../application/ServidorController";

export default interface IServicioUsuarios {
    crearSesion(body: CrearSesionDTO): Promise<Sesion>;

    crearSesionConGoogle(body: CrearSesionConGoogleDTO): Promise<Sesion>;

    crearUsuario(body: CrearUsuarioDTO): Promise<UsuarioDTO>

    crearServidor(param: { nombre: string }): Promise<Servidor>;

    listarServidores(): Promise<Servidor[]>;
}

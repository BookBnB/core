import { Action } from "routing-controllers";
import { Sesion } from "../domain/sesiones/entidades/Sesion";
import Usuario from "../domain/usuarios/entidades/Usuario";

export function currentUserChecker(action: Action): Usuario {
    const token: string = action.request.headers['authorization'];

    const sesion: Sesion = new Sesion(token);

    return new Usuario(sesion.getId(), sesion.getRol());
}

export function authorizationChecker(action: Action, roles: string[]): boolean {
    const usuario: Usuario = currentUserChecker(action);
    return roles.some(rol => usuario.tieneRol(rol));
}

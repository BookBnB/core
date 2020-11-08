import { Action } from "routing-controllers";
import { Sesion } from "../domain/sesiones/entidades/Sesion";

export function currentUserChecker(action: Action): Sesion {
    const token: string = action.request.headers['authorization'];
    return new Sesion(token);
}

import {UseCase} from "../../UseCase";
import Usuario from "../../usuarios/entidades/Usuario";

export class ResponderEnPublicacion implements UseCase {
    execute(idPublicacion: string, idPregunta: string, usuario: Usuario, respuesta: string): any {
    }
}

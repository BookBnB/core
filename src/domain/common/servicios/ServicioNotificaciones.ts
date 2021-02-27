import Usuario from "../../usuarios/entidades/Usuario";
import Mensaje from "../../usuarios/entidades/Mensaje";

export default interface IServicioNotificaciones {
    enviar(usuario: Usuario, mensaje: Mensaje): Promise<void>;
}

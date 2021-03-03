import IServicioNotificaciones from "../../domain/common/servicios/ServicioNotificaciones";
import Usuario from "../../domain/usuarios/entidades/Usuario";
import Mensaje from "../../domain/usuarios/entidades/Mensaje";

export default class NotificacionesFake implements IServicioNotificaciones {
    enviar(usuario: Usuario, mensaje: Mensaje): Promise<void> {
        return Promise.resolve(undefined);
    }
}

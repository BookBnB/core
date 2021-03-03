import IServicioNotificaciones from "../../src/domain/common/servicios/ServicioNotificaciones";
import Usuario from "../../src/domain/usuarios/entidades/Usuario";
import Mensaje from "../../src/domain/usuarios/entidades/Mensaje";

export default class NotificacionesFake implements IServicioNotificaciones {
    enviar(usuario: Usuario, mensaje: Mensaje): Promise<void> {
        return Promise.resolve(undefined);
    }
}

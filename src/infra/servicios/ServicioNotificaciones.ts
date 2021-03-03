import IServicioNotificaciones from "../../domain/common/servicios/ServicioNotificaciones";
import Usuario from "../../domain/usuarios/entidades/Usuario";
import Mensaje from "../../domain/usuarios/entidades/Mensaje";
import admin from "firebase-admin";


export default class ServicioNotificaciones implements IServicioNotificaciones {
    constructor(
        private readonly serviceAccount: string,
        private readonly databaseURL: string
    ) {
        admin.initializeApp({
            credential: admin.credential.cert(this.serviceAccount),
            databaseURL: this.databaseURL
        });
    }

    enviar(usuario: Usuario, mensaje: Mensaje): Promise<void> {
        return Promise.resolve(undefined);
    }
}

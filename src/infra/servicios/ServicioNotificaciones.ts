import IServicioNotificaciones from "../../domain/common/servicios/ServicioNotificaciones";
import Usuario from "../../domain/usuarios/entidades/Usuario";
import Mensaje from "../../domain/usuarios/entidades/Mensaje";
import admin from "firebase-admin";
import IDispositivoRepositorio from "../../domain/usuarios/repositorios/DispositivoRepositorio";
import {app} from "firebase-admin/lib/firebase-namespace-api";
import {ILogger} from "../logging/Logger";


export default class ServicioNotificaciones implements IServicioNotificaciones {
    private admin: app.App;

    constructor(
        private readonly serviceAccount: string,
        private readonly databaseURL: string,
        private readonly dispositivos: IDispositivoRepositorio,
        private readonly logger: ILogger
    ) {
        let credential
        try{
            credential = JSON.parse(this.serviceAccount)
        } catch (e) {
            credential = admin.credential.cert(this.serviceAccount)
        }

        this.admin = admin.initializeApp({
            credential: admin.credential.cert(credential),
            databaseURL: this.databaseURL
        });
    }

    async enviar(usuario: Usuario, mensaje: Mensaje): Promise<void> {
        try {
            const dispositivo = await this.dispositivos.obtener(usuario)
            await admin.messaging().sendToDevice(
                dispositivo.token,
                {
                    notification: {
                        title: mensaje.titulo,
                        body: mensaje.descripcion
                    }
                }, {
                    priority: "high",
                    timeToLive: 60 * 60 * 24
                })
            this.logger.info(`Notificacion enviada a usuario ${usuario.id}`)
        } catch (e) {
            this.logger.error(e)
        }
        return Promise.resolve(undefined);
    }
}

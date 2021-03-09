import IServicioNotificaciones from "../../domain/common/servicios/ServicioNotificaciones";
import Usuario from "../../domain/usuarios/entidades/Usuario";
import Mensaje from "../../domain/usuarios/entidades/Mensaje";
import admin from "firebase-admin";
import IDispositivoRepositorio from "../../domain/usuarios/repositorios/DispositivoRepositorio";
import {app} from "firebase-admin/lib/firebase-namespace-api";
import {ILogger} from "../logging/Logger";


export default class ServicioNotificaciones implements IServicioNotificaciones {
    constructor(
        private readonly admin: app.App,
        private readonly dispositivos: IDispositivoRepositorio,
        private readonly logger: ILogger
    ) {
    }

    async enviar(usuario: Usuario, mensaje: Mensaje): Promise<void> {
        try {
            const dispositivo = await this.dispositivos.obtener(usuario)
            await admin.messaging().send({
                token: dispositivo.token,
                notification: {
                    title: mensaje.titulo,
                    body: mensaje.descripcion
                },
                android: {
                    priority: "high",
                    ttl: 60 * 60 * 24 * 1000
                },
                data: {
                    deeplink: mensaje.deeplink || ''
                }
            })
            this.logger.info(`Notificacion enviada a usuario ${usuario.id}`)
        } catch (e) {
            this.logger.error(e)
        }
        return Promise.resolve(undefined);
    }
}

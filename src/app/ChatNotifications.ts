import IServicioNotificaciones from "../domain/common/servicios/ServicioNotificaciones";
import {app} from "firebase-admin/lib/firebase-namespace-api";
import {ILogger} from "../infra/logging/Logger";
import Usuario, {RolUsuario} from "../domain/usuarios/entidades/Usuario";
import Mensaje from "../domain/usuarios/entidades/Mensaje";

export default class ChatNotifications {
    constructor(
        private readonly notificaciones: IServicioNotificaciones,
        private readonly admin: app.App,
        private readonly logger: ILogger
    ) {
        this.listenForChatMessages()
    }

    private listenForChatMessages() {
        const ref = this.admin.database().ref();
        const requests = ref.child('notifications');
        requests.on('child_added', async (requestSnapshot) => {
            const request = requestSnapshot.val();
            this.logger.info('Nuevo mensaje:', request)
            await requestSnapshot.ref.remove()
            await this.sendNewMessageNotification(
                request.receiverId,
                request.senderName,
                request.message,
                request.chatId
            );
        }, (error) => {
            this.logger.error(error);
        });
    }

    private async sendNewMessageNotification(receptorId: string, nombreRemitente: string, mensaje: string, chatId: string) {
        await this.notificaciones.enviar(
            new Usuario(receptorId, RolUsuario.HUESPED),
            Mensaje.chatRecibido(nombreRemitente, mensaje, chatId)
        )
    }
}

import Reserva from "../../reservas/entidades/Reserva";

export default class Mensaje {
    public titulo: string;

    public descripcion: string;

    public deeplink?: string;

    private constructor(titulo: string, descripcion: string, deeplink?: string) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.deeplink = deeplink;
    }

    static reservaRecibida(reserva: Reserva): Mensaje {
        return new Mensaje(
            "Reserva recibida",
            "Ha recibido una nueva reserva!",
            `https://www.bookbnb.com/anfitrion/publicacion/${reserva.publicacion.id}/reservas`
        )
    }

    static reservaAceptada(reserva: Reserva): Mensaje {
        return new Mensaje(
            "Reserva aceptada",
            `Su reserva en ${reserva.publicacion.titulo} ha sido aceptada!`,
            "https://www.bookbnb.com/huesped/reservas"
        )
    }

    static reservaRechazada(reserva: Reserva): Mensaje {
        return new Mensaje(
            "Reserva rechazada",
            `Su reserva en ${reserva.publicacion.titulo} ha sido rechazada!`,
            "https://www.bookbnb.com/huesped/reservas"
        )
    }

    static reservaCancelada(reserva: Reserva): Mensaje {
        return new Mensaje(
            "Reserva cancelada",
            `El huéped ha cancelado su reserva en ${reserva.publicacion.titulo}!`,
            `https://www.bookbnb.com/anfitrion/publicacion/${reserva.publicacion.id}/reservas`
        )
    }

    static chatRecibido(nombreRemitente: string, mensaje: string, chatId: string) {
        return new Mensaje(
            nombreRemitente,
            mensaje,
            `https://www.bookbnb.com/chat/${chatId}`
        )
    }
}

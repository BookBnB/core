export default class Mensaje {
    public titulo: string;

    public descripcion: string;

    public deeplink?: string;

    private constructor(titulo: string, descripcion: string, deeplink?: string) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.deeplink = deeplink;
    }

    static reservaRecibida(publicacionId?: string): Mensaje {
        return new Mensaje(
            "Reserva recibida",
            "Ha recibido una nueva reserva!",
            publicacionId ? `https://www.bookbnb.com/anfitrion/publicacion/${publicacionId}/reservas` : undefined
        )
    }

    static reservaAceptada(): Mensaje {
        return new Mensaje("Reserva aceptada", "Su reserva ha sido aceptada!")
    }

    static reservaRechazada(): Mensaje {
        return new Mensaje("Reserva rechazada", "Su reserva ha sido rechazada!")
    }

    static chatRecibido(nombreRemitente: string, mensaje: string) {
        return new Mensaje(nombreRemitente, mensaje)
    }
}

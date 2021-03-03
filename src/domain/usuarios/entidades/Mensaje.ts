export default class Mensaje {
    public titulo: string;

    public descripcion: string;

    private constructor(titulo: string, descripcion: string) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    static reservaRecibida(): Mensaje {
        return new Mensaje("Reserva recibida", "Ha recibido una nueva reserva!")
    }

    static reservaAceptada(): Mensaje {
        return new Mensaje("Reserva aceptada", "Su reserva ha sido aceptada!")
    }

    static reservaRechazada(): Mensaje {
        return new Mensaje("Reserva rechazada", "Su reserva ha sido rechazada!")
    }
}

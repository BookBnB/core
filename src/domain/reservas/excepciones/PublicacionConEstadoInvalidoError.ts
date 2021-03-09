export default class PublicacionConEstadoInvalidoError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, PublicacionConEstadoInvalidoError.prototype);
    }

    public static noSePuedeCrearReserva(estado: string): PublicacionConEstadoInvalidoError {
        return new PublicacionConEstadoInvalidoError(`No se puede crear una reserva en esta publicación porque se encuentra en estado ${estado}.`)
    }
}

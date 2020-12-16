export default class EventoNoReconocidoError extends Error {
    constructor(msg: string = 'Evento no reconocido') {
        super(msg)
        Object.setPrototypeOf(this, EventoNoReconocidoError.prototype)
    }
}
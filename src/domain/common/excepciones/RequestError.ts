export default class RequestError extends Error {
    private statusCode: number;

    constructor(statusCode: number, mensaje: string) {
        super(mensaje);
        this.statusCode = statusCode
        Object.setPrototypeOf(this, RequestError.prototype);
    }
}

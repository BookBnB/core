export default class UsuarioNoAutorizadoError extends Error {
    private statusCode: number;

    constructor(m: string) {
        super(m);
        this.statusCode = 403
        Object.setPrototypeOf(this, UsuarioNoAutorizadoError.prototype);
    }
}

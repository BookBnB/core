export default class UsuarioNoReconocidoError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, UsuarioNoReconocidoError.prototype);
    }
}
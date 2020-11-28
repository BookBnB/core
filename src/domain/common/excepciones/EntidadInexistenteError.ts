export default class EntidadInexistenteError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, EntidadInexistenteError.prototype);
    }
}

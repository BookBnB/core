export default class EntidadInexistenteError extends Error {
    private statusCode: number;

    constructor(m: string) {
        super(m);
        this.statusCode = 404
        Object.setPrototypeOf(this, EntidadInexistenteError.prototype);
    }
}

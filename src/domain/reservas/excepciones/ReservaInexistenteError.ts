import EntidadInexistenteError from "../../common/excepciones/EntidadInexistenteError";

export default class ReservaInexistenteError extends EntidadInexistenteError {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ReservaInexistenteError.prototype);
    }
}

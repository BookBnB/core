import EntidadInexistenteError from "../../common/excepciones/EntidadInexistenteError";

export default class PublicacionInexistenteError extends EntidadInexistenteError {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, PublicacionInexistenteError.prototype);
    }
}

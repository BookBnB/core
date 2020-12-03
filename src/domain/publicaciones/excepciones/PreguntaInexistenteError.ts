import EntidadInexistenteError from "../../common/excepciones/EntidadInexistenteError";

export default class PreguntaInexistenteError extends EntidadInexistenteError {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, PreguntaInexistenteError.prototype);
    }
}

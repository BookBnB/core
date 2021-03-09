import EntidadInexistenteError from "../../common/excepciones/EntidadInexistenteError";

export default class DispositivoInexistenteError extends EntidadInexistenteError {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, DispositivoInexistenteError.prototype);
    }
}

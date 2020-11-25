import EntidadInexistenteError from "../../common/excepciones/EntidadInexistenteError";

export default class UsuarioInexistenteError extends EntidadInexistenteError {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, UsuarioInexistenteError.prototype);
    }
}

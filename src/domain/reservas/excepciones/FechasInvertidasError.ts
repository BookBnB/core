import ValorInvalido from "../../common/excepciones/ValorInvalido";

export default class FechasInvertidasError extends ValorInvalido {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, FechasInvertidasError.prototype);
    }
}

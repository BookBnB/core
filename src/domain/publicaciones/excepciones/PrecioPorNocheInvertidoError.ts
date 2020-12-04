import ValorInvalido from "../../common/excepciones/ValorInvalido";

export default class PrecioPorNocheInvertidoError extends ValorInvalido {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, PrecioPorNocheInvertidoError.prototype);
    }
}

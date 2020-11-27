import ValorInvalido from "../../common/excepciones/ValorInvalido";

export default class PrecioPorNocheInvertido extends ValorInvalido {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, PrecioPorNocheInvertido.prototype);
    }
}

export default class ValorInvalido extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ValorInvalido.prototype);
    }
}

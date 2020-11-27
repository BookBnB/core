export default class ValorInvalido extends Error {
    private statusCode: number;

    constructor(m: string) {
        super(m);
        this.statusCode = 400
        Object.setPrototypeOf(this, ValorInvalido.prototype);
    }
}

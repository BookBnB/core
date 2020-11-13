export default class FechasInvertidasError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, FechasInvertidasError.prototype);
    }
}
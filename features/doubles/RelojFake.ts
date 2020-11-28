import IReloj from "../../src/domain/common/servicios/Reloj";

export default class RelojFake implements IReloj {
    private _ahora: number;

    constructor() {
        this._ahora = Date.now();
    }

    ahora(): number {
        return this._ahora;
    }

    setAhora(timestamp: number): void {
        this._ahora = timestamp;
    }
}

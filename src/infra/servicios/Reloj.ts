import IReloj from "../../domain/common/servicios/Reloj";

export default class Reloj implements IReloj {
    ahora(): number {
        return Date.now();
    }
}

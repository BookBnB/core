import {ValueTransformer} from "typeorm/decorator/options/ValueTransformer";
import EstadoDePublicacion from "./EstadoDePublicacion";
import Creada from "./Creada";
import PendienteDeCreacion from "./PendienteDeCreacion";
import Rechazada from "./Rechazada";

export default class EstadoPublicacionTransformer implements ValueTransformer {
    to(value: EstadoDePublicacion): string {
        return value.toString();
    }

    from(value: string): EstadoDePublicacion {
        return {
            [Creada.DISCRIMINANTE]: () => new Creada(),
            [PendienteDeCreacion.DISCRIMINANTE]: () => new PendienteDeCreacion(),
            [Rechazada.DISCRIMINANTE]: () => new Rechazada(),
        }[value]()
    }
}

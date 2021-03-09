import sinon from "sinon";
import Reserva from "../../../src/domain/reservas/entidades/Reserva";
import Usuario from "../../../src/domain/usuarios/entidades/Usuario";
import Publicacion from "../../../src/domain/publicaciones/entidades/Publicacion";

export default class ReservaBuilder {
    private fechaFin: Date;
    private fechaInicio: Date;

    private constructor() {
        this.fechaInicio = new Date('2020-12-01')
        this.fechaFin = new Date('2020-12-05')
    }

    static crear(): ReservaBuilder {
        return new this()
    }

    conFechaInicio(fechaInicio: Date): ReservaBuilder {
        this.fechaInicio = fechaInicio
        return this
    }

    conFechaFin(fechaFin: Date): ReservaBuilder {
        this.fechaFin = fechaFin
        return this
    }

    build(): Reserva {
        return new Reserva({
            fechaFin: this.fechaFin,
            fechaInicio: this.fechaInicio,
            huesped: sinon.createStubInstance(Usuario),
            precioPorNoche: 200,
            publicacion: sinon.createStubInstance(Publicacion)
        })
    }
}

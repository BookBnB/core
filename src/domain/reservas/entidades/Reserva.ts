import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import Publicacion from "../../publicaciones/entidades/Publicacion";
import Usuario from "../../usuarios/entidades/Usuario";
import FechasInvertidasError from "../excepciones/FechasInvertidasError";

export interface ReservaConstructor {
    fechaInicio: Date;
    fechaFin: Date;
    huesped: Usuario;
    publicacion: Publicacion;
    precioPorNoche: number;
}

export enum EstadoReserva {
    PENDIENTE_CREACION = 'pendiente de creación',
    CREADA = 'creada',
    ACEPTADA = 'aceptada',
    REACHAZADA = 'rechazada'
}

@Entity()
export default class Reserva {
    static LONGITUD_ID: number = 6

    @PrimaryColumn("varchar", {length: Reserva.LONGITUD_ID})
    public id?: string;

    @Column('date')
    public fechaInicio!: Date;

    @Column('date')
    public fechaFin!: Date;

    @ManyToOne(type => Publicacion, publicacion => publicacion.reservas)
    public publicacion!: Publicacion;

    @Column(type => Usuario)
    public huesped!: Usuario;

    @Column('text')
    public estado!: EstadoReserva;

    @Column('float')
    public precioPorNoche!: number;

    public constructor(args: ReservaConstructor) {
        Object.assign(this, args);
        this.estado = EstadoReserva.PENDIENTE_CREACION

        if (this.fechaFin < this.fechaInicio) {
            throw new FechasInvertidasError('Fechas de reserva invertidas');
        }
    }

    confirmarCreacion() {
        this.estado = EstadoReserva.CREADA
    }

    aceptar() {
        this.estado = EstadoReserva.ACEPTADA
        const reservas = this.publicacion.getReservas();
        reservas.forEach(reserva => {
            if (reserva.igualA(this)) {
                // Actualizo la reserva anidada por consistencia,
                // dado que al cargar las entidades a memoria TypeOrm
                // crea dos objetos para la reserva actual
                // (queda pendiente investigar si esto se puede mejorar).
                reserva.estado = EstadoReserva.ACEPTADA
            } else if (reserva.fechasSolapadas(this)) {
                reserva.rechazar()
            }
        })
    }

    rechazar() {
        this.estado = EstadoReserva.REACHAZADA
    }

    fechasSolapadas(otra: Reserva): boolean {
        return (this.fechaInicio <= otra.fechaFin) && (otra.fechaInicio <= this.fechaFin)
    }

    igualA(otra: Reserva): boolean {
        return Boolean(this.id) && (this.id === otra.id)
    }

    getPublicacion(): Publicacion {
        return this.publicacion;
    }
}

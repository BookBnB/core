import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import Publicacion from "../../publicaciones/entidades/Publicacion";
import Usuario from "../../usuarios/entidades/Usuario";
import FechasInvertidasError from "../excepciones/FechasInvertidasError";

export interface ReservaConstructor {
    fechaInicio: Date;
    fechaFin: Date;
    huesped: Usuario;
    publicacion: Publicacion;
    estado: EstadoReserva;
    precioPorNoche: number;
}

export enum EstadoReserva {
    PENDIENTE = 'pendiente'
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

    @ManyToOne(type => Usuario, usuario => usuario.reservas, {cascade: true, eager: true})
    public huesped!: Usuario;

    @Column('text')
    public estado!: EstadoReserva;

    @Column('float')
    public precioPorNoche!: number;

    public constructor(args: ReservaConstructor) {
        Object.assign(this, args);

        if (this.fechaFin < this.fechaInicio) {
            throw new FechasInvertidasError('Fechas de reserva invertidas');
        }
    }
}

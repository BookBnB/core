import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @PrimaryGeneratedColumn("uuid")
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

    @Column('int')
    public precioPorNoche!: number;

    public constructor(args: ReservaConstructor) {
        Object.assign(this, args);

        if (this.fechaFin < this.fechaInicio) {
            throw new FechasInvertidasError('Fechas de reserva invertidas');
        }
    }
}

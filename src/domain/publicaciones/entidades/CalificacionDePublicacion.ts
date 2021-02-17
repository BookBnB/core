import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "../../usuarios/entidades/Usuario";
import Publicacion from "./Publicacion";

export interface CalificacionDePublicacionConstructor {
    puntos: number
    detalle?: string
    huesped: Usuario,
    publicacion: Publicacion
}

@Entity()
export default class CalificacionDePublicacion {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column('int')
    public puntos!: number;

    @Column('text', {nullable: true})
    public detalle?: string;

    @Column(type => Usuario)
    public huesped!: Usuario;

    @ManyToOne(type => Publicacion, publicacion => publicacion.calificaciones)
    public publicacion!: Publicacion;

    constructor(args: CalificacionDePublicacionConstructor) {
        Object.assign(this, args);
    }
}

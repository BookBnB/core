import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import Usuario from "../../usuarios/entidades/Usuario";
import Direccion, {DireccionConstructor} from "../../lugares/entidades/Direccion";
import Imagen from "./Imagen";
import Reserva from "../../reservas/entidades/Reserva";

export interface PublicacionConstructor {
    titulo: string
    descripcion: string
    precioPorNoche: number
    direccion: DireccionConstructor
    cantidadDeHuespedes: number
    anfitrion: Usuario,
    imagenes: Imagen[]
}

export enum TipoDeAlojamiento {
    alojamientoEntero = 'Alojamiento entero',
    habitacionPrivada = 'Habitación privada',
    habitacionCompartida = 'Habitación compartida',
    habitacionDeHotel = 'Habitación de hotel'
}

@Entity()
export default class Publicacion {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public titulo!: string;

    @Column("text")
    public descripcion!: string;

    @Column("float")
    public precioPorNoche!: number;

    @Column(type => Direccion)
    public direccion!: Direccion;

    @Column("int")
    public cantidadDeHuespedes!: number;

    @Column({type: 'enum', enum: TipoDeAlojamiento})
    public tipoDeAlojamiento!: TipoDeAlojamiento;

    @Column(type => Usuario)
    public anfitrion!: Usuario;

    @OneToMany(() => Imagen, imagen => imagen.publicacion, {cascade: true, eager: true})
    public imagenes!: Imagen[];

    @OneToMany(() => Reserva, reserva => reserva.publicacion)
    public reservas!: Reserva[];

    constructor(args: PublicacionConstructor) {
        Object.assign(this, args);
    }
}

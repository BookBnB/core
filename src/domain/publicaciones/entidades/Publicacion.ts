import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "../../usuarios/entidades/Usuario";

export interface DireccionConstructor {
    calle: string
    numero: number
}

export interface PublicacionConstructor {
    titulo: string
    descripcion: string
    precioPorNoche: number
    direccion: DireccionConstructor
    cantidadDeHuespedes: number
    anfitrion: Usuario
}

export class Direccion {
    @Column()
    private calle!: string;

    @Column()
    private numero!: number;

    constructor(args: DireccionConstructor) {
        Object.assign(this, args);
    }
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

    @Column(type => Usuario)
    public anfitrion!: Usuario;

    constructor(args: PublicacionConstructor) {
        Object.assign(this, args);
    }
}

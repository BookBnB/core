import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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

    constructor(args: PublicacionConstructor) {
        Object.assign(this, args);
    }
}

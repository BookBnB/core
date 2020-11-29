import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "../../usuarios/entidades/Usuario";
import Publicacion from "./Publicacion";

interface PreguntaConstructor {
    descripcion: string
    usuario: Usuario,
}

@Entity()
export default class Pregunta {

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column("timestamp")
    public creada: Date

    @Column("text")
    public descripcion!: string;

    @Column(type => Usuario)
    public usuario!: Usuario;

    @ManyToOne(type => Publicacion, publicacion => publicacion.preguntas)
    public publicacion!: Promise<Publicacion>;

    constructor(args: PreguntaConstructor) {
        this.creada = new Date();
        Object.assign(this, args);
    }
}

import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "../../usuarios/entidades/Usuario";
import Publicacion from "./Publicacion";
import Respuesta from "./Respuesta";

interface PreguntaConstructor {
    descripcion: string
    usuario: Usuario
    publicacion: Publicacion
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
    public publicacion!: Publicacion;

    @OneToOne(type => Respuesta, respuesta => respuesta.pregunta, {cascade: true, eager: true})
    public respuesta!: Respuesta;

    constructor(args: PreguntaConstructor) {
        this.creada = new Date();
        Object.assign(this, args);
    }

    responder(descripcion: string, usuario: Usuario): void {
        this.respuesta = new Respuesta({descripcion, usuario})
    }

    getId(): string | undefined {
        return this.id
    }
}

import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import Usuario from "../../usuarios/entidades/Usuario";
import Pregunta from "./Pregunta";

interface RespuestaConstructor {
    descripcion: string
    usuario: Usuario,
}

@Entity()
export default class Respuesta {

    @OneToOne(type => Pregunta, pregunta => pregunta.respuesta, {primary: true})
    @JoinColumn()
    public pregunta!: Pregunta;

    @Column("timestamp")
    public creada: Date

    @Column("text")
    public descripcion!: string;

    @Column(type => Usuario)
    public usuario!: Usuario;

    constructor(args: RespuestaConstructor) {
        this.creada = new Date();
        Object.assign(this, args);
    }
}

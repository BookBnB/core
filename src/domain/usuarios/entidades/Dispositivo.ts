import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "./Usuario";

@Entity()
export default class Dispositivo {
    @PrimaryGeneratedColumn("uuid")
    public id?: string

    @Column(type => Usuario)
    public usuario: Usuario;

    @Column("text")
    public token: string;

    constructor(usuario: Usuario, token: string) {
        this.usuario = usuario
        this.token = token;
    }
}

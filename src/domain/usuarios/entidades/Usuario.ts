import {IsString, IsUUID} from "class-validator";
import {Entity, OneToMany, PrimaryColumn} from "typeorm";
import Publicacion from "../../publicaciones/entidades/Publicacion";
import Reserva from "../../reservas/entidades/Reserva";

@Entity()
export default class Usuario {
    @IsUUID() @PrimaryColumn("uuid")
    public id!: string;

    @IsString()
    public rol!: string;

    @OneToMany(type => Publicacion, publicacion => publicacion.anfitrion)
    public publicaciones!: Publicacion[];

    @OneToMany(type => Reserva, reserva => reserva.huesped)
    public reservas!: Reserva[];

    constructor(id: string, rol: string) {
        this.id = id;
        this.rol = rol;
    }

    public tieneRol(rol: string): boolean {
        return this.rol === rol
    }
}

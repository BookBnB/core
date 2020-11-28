import {IsString, IsUUID} from "class-validator";
import {Column} from "typeorm";
import Publicacion from "../../publicaciones/entidades/Publicacion";
import Reserva from "../../reservas/entidades/Reserva";

export default class Usuario {
    @IsUUID() @Column("uuid") public id!: string;

    @IsString() public rol!: string;

    public publicaciones!: Publicacion[];

    public reservas!: Reserva[];

    constructor(id: string, rol: string) {
        this.id = id;
        this.rol = rol;
    }

    public tieneRol(rol: string): boolean {
        return this.rol === rol
    }
}

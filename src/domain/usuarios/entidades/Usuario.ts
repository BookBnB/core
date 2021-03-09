import {IsString, IsUUID} from "class-validator";
import {Column} from "typeorm";

export enum RolUsuario {
    HUESPED = 'guest',
    ANFITRION = 'host',
    ADMIN = 'admin'
}

export default class Usuario {
    @IsUUID() @Column("uuid")
    public id!: string;

    @IsString()
    public rol!: RolUsuario;

    constructor(id: string, rol: RolUsuario) {
        this.id = id;
        this.rol = rol;
    }

    public tieneRol(rol: RolUsuario): boolean {
        return this.rol === rol
    }

    esIgualA(otro: Usuario): boolean {
        return this.id === otro.id;
    }
}

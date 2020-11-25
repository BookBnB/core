import {IsString, IsUUID} from "class-validator";
import {Column} from "typeorm";

export default class Usuario {
    @IsUUID() @Column() public id!: string;
    @IsString() public rol!: string;

    constructor(id: string, rol: string) {
        this.id = id;
        this.rol = rol;
    }

    public tieneRol(rol: string): boolean {
        return this.rol === rol
    }
}

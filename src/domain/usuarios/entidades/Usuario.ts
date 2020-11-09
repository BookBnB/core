import { IsString } from "class-validator";
import {Column} from "typeorm";

export default class Usuario {
    @IsString() @Column() public email!: string;
    @IsString() public rol!: string;

    constructor(email: string, rol: string) {
        this.email = email;
        this.rol = rol;
    }
}

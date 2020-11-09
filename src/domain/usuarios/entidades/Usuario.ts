import { IsString } from "class-validator";

export default class Usuario {
    @IsString() public email!: string;
    @IsString() public rol!: string;

    constructor(email: string, rol: string) {
        this.email = email;
        this.rol = rol;
    }
}

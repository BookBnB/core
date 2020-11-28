import { IsString } from "class-validator";

export default class CrearSesionDTO {
    @IsString() public email!: string;
    @IsString() public password!: string;
}

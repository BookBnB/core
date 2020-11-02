import { IsString } from "class-validator";

export default class CrearSessionDTO {
    @IsString() public email!: string;
    @IsString() public password!: string;
}

import {IsInt, IsString, MinLength} from "class-validator";

export default class DireccionDTO {
    @IsString() @MinLength(2) public calle: string
    @IsInt() public numero: number
    constructor(calle: string, numero: number) {
        this.calle = calle;
        this.numero = numero;
    }
}

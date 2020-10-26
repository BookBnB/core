import {IsString} from "class-validator";

export default class DireccionDTO {
    @IsString() public calle: string
    @IsString() public numero: number
    constructor(calle: string, numero: number) {
        this.calle = calle;
        this.numero = numero;
    }
}

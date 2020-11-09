import {IsLatitude, IsLongitude, IsString, ValidateNested} from "class-validator";
import {Column} from "typeorm";

export class Coordenadas {
    @IsLatitude() private latitud!: number
    @IsLongitude() private longitud!: number
}

export interface LugarConstructor {
    pais: string
    provincia: string
    coordenadas: {
        latitud: number,
        longitud: number
    }
}

export default class Lugar {

    @IsString() @Column()
    private pais!: string

    @IsString() @Column()
    private provincia!: string

    @ValidateNested() @Column(type => Coordenadas)
    private coordenadas!: Coordenadas

    constructor(args: LugarConstructor) {
        Object.assign(this, args)
    }
}

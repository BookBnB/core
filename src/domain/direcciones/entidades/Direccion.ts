import {IsLatitude, IsLongitude, IsString, ValidateNested} from "class-validator";

export class Coordenadas {
    @IsLatitude() private latitud!: number
    @IsLongitude() private longitud!: number
}

interface DireccionConstructor {
    id: string
    pais: string
    ciudad: string
    municipio?: string
    codigoPostal: string
    direccion: string
    codigoDePais: string
    coordenadas: {
        latitud: number,
        longitud: number
    }
}

export default class Direccion {

    @IsString() private id!: string
    @IsString() private pais!: string
    @IsString() private ciudad!: string
    @IsString() private municipio?: string
    @IsString() private codigoPostal!: string
    @IsString() private direccion!: string
    @IsString() private codigoDePais!: string
    @ValidateNested() private coordenadas!: Coordenadas

    constructor(args: DireccionConstructor) {
        Object.assign(this, args)
    }
}

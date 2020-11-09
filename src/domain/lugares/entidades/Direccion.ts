import {IsLatitude, IsLongitude, IsOptional, IsString, ValidateNested} from "class-validator";
import {Column} from "typeorm";
import Lugar, {LugarConstructor} from "./Lugar";

export class Coordenadas {
    @IsLatitude() private latitud!: number
    @IsLongitude() private longitud!: number
}

interface DireccionConstructor extends LugarConstructor {
    ciudad: string
    provincia: string
    municipio?: string
    direccion: string
}

export default class Direccion extends Lugar {

    @IsString() @Column()
    private ciudad!: string

    @IsString() @Column()
    private provincia!: string

    @IsString() @IsOptional() @Column({nullable: true})
    private municipio?: string

    @IsString()
    private direccion!: string

    constructor(args: DireccionConstructor) {
        super(args);
        Object.assign(this, args)
    }
}

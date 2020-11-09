import {IsOptional, IsString} from "class-validator";
import {Column} from "typeorm";
import Lugar, {LugarConstructor} from "./Lugar";

interface DireccionConstructor extends LugarConstructor {
    ciudad: string
    municipio?: string
    direccion: string
}

export default class Direccion extends Lugar {

    @IsString() @Column()
    private ciudad!: string

    @IsString() @IsOptional() @Column({nullable: true})
    private municipio?: string

    @IsString()
    private direccion!: string

    constructor(args: DireccionConstructor) {
        super(args);
        Object.assign(this, args)
    }
}

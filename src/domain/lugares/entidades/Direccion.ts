import {IsNotEmpty, IsOptional} from "class-validator";
import {Column} from "typeorm";
import Lugar, {LugarConstructor} from "./Lugar";

export interface DireccionConstructor extends LugarConstructor {
    ciudad: string
    municipio?: string
    direccion: string
}

export default class Direccion extends Lugar {

    @IsNotEmpty() @Column()
    private ciudad!: string

    @IsNotEmpty() @IsOptional() @Column({nullable: true})
    private municipio?: string

    @IsNotEmpty() @Column()
    private direccion!: string

    constructor(args: DireccionConstructor) {
        super(args);
        Object.assign(this, args)
    }
}

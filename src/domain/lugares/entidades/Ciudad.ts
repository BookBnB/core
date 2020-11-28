import {IsString} from "class-validator";
import {Column} from "typeorm";
import Lugar, {LugarConstructor} from "./Lugar";

interface CiudadConstructor extends LugarConstructor {
    ciudad: string
}

export default class Ciudad extends Lugar {

    @IsString() @Column()
    private ciudad: string

    constructor(args: CiudadConstructor) {
        super(args);
        this.ciudad = args.ciudad
    }
}

import {UseCase} from "../../UseCase";
import {
    IsBoolean,
    IsInt,
    IsISO31661Alpha2,
    IsLatLong, IsOptional, IsString, Length,
    Max,
    Min, MinLength, ValidateNested,
} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";
import Direccion from "../entidades/Direccion";
import {Type} from "class-transformer";
import IServicioDirecciones from "../servicios/ServicioDirecciones";

export interface ConsultaDeDireccionConstructor {
    consulta: string
    limite?: number
    lenguaje?: string
    alrededorDeLatitudLongitud?: string
    alrededorRadio?: number
    conInfoDeRanking?: boolean
}

export class ConsultaDeDireccion {
    @IsString() @MinLength(1)
    public consulta!: string

    @IsInt() @Min(1) @Max(20) @IsOptional()
    @JSONSchema({description: 'Especifica la cantidad de resultados a obtener, con un máximo de 20.'})
    public limite?: number

    @IsString() @Length(2, 2) @IsOptional()
    @JSONSchema({description: 'Devuelve los resultados en este lenguaje (por defecto español). Deben ser dos letras en ISO 639-1.'})
    public lenguaje?: string = 'es'

    @IsOptional()
    @IsISO31661Alpha2({each: true})
    @ValidateNested({each: true})
    @Type(() => String)
    public paises?: string[]

    @IsLatLong() @IsOptional()
    public alrededorDeLatitudLongitud?: string

    @IsInt() @Min(1) @IsOptional()
    public alrededorRadio?: number

    @IsBoolean() @IsOptional()
    public conInfoDeRanking?: boolean

    constructor(args: ConsultaDeDireccionConstructor) {
        Object.assign(this, args);
    }
}

export class BuscarDirecciones implements UseCase {
    constructor(private readonly direcciones: IServicioDirecciones) {
    }

    async execute(consulta: ConsultaDeDireccion): Promise<Direccion[]> {
        return this.direcciones.buscarDirecciones(consulta)
    }
}

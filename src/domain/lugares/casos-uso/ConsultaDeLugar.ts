import {
    IsBoolean,
    IsInt,
    IsLatLong, IsOptional, IsString, Length,
    Max,
    Min, MinLength, ValidateNested,
} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";
import {Type} from "class-transformer";

export interface ConsultaDeLugarConstructor {
    consulta: string
    limite?: number
    lenguaje?: string
    alrededorDeLatitudLongitud?: string
    alrededorRadio?: number
    conInfoDeRanking?: boolean
}

export default class ConsultaDeLugar {
    @IsString() @MinLength(1)
    public consulta!: string

    @IsInt() @Min(1) @Max(20) @IsOptional()
    @JSONSchema({description: 'Especifica la cantidad de resultados a obtener, con un máximo de 20.'})
    public limite?: number

    @IsString() @Length(2, 2) @IsOptional()
    @JSONSchema({description: 'Devuelve los resultados en este lenguaje (por defecto español). Deben ser dos letras en ISO 639-1.'})
    public lenguaje?: string = 'es'

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => String)
    @JSONSchema({description: 'Restringe los resultados a estos países. Deben ser letras en ISO 3166-1.'})
    public paises?: string[]

    @IsLatLong() @IsOptional()
    public alrededorDeLatitudLongitud?: string

    @IsInt() @Min(1) @IsOptional()
    public alrededorRadio?: number

    @IsBoolean() @IsOptional()
    public conInfoDeRanking?: boolean

    constructor(args: ConsultaDeLugarConstructor) {
        Object.assign(this, args);
    }
}

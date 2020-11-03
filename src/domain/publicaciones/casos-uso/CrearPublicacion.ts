import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import DireccionDTO from "../dtos/DireccionDTO";
import {IsPositive, IsString, MinLength, ValidateNested} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import {Type} from "class-transformer";

export interface CrearPublicacionDTOConstructor {
    titulo: string
    descripcion: string
    precioPorNoche: number
    direccion: DireccionDTO,
    cantidadDeHuespedes: number
}

export class CrearPublicacionDTO {
    @IsString() @MinLength(3)
    public titulo!: string

    @IsString() @MinLength(3)
    public descripcion!: string

    @JSONSchema({example: 2}) @IsPositive()
    public precioPorNoche!: number

    @ValidateNested() @Type(() => DireccionDTO)
    public direccion!: DireccionDTO

    @JSONSchema({example: 2}) @IsPositive()
    public cantidadDeHuespedes!: number

    constructor(args: CrearPublicacionDTOConstructor) {
        Object.assign(this, args);
    }
}

export class CrearPublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(pedido: CrearPublicacionDTO): Promise<PublicacionDTO> {
        const publicacion = new Publicacion(pedido)
        await this.publicaciones.guardar(publicacion)
        return new PublicacionDTO(publicacion)
    }
}

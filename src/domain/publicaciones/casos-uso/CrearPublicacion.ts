import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import DireccionDTO from "../dtos/DireccionDTO";
import {IsPositive, IsString, ValidateNested} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";

export interface CrearPublicacionDTOConstructor {
    titulo: string
    descripcion: string
    precioPorNoche: number
    direccion: DireccionDTO,
    cantidadDeHuespedes: number
}

export class CrearPublicacionDTO {
    @IsString() public titulo!: string
    @IsString() public descripcion!: string
    @JSONSchema({example: 2}) @IsPositive() public precioPorNoche!: number
    @ValidateNested() public direccion!: DireccionDTO
    @JSONSchema({example: 2}) @IsPositive() public cantidadDeHuespedes!: number

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

import {UseCase} from "../../UseCases";
import PublicacionDTO from "../dtos/PublicacionDTO";
import DireccionDTO from "../dtos/DireccionDTO";
import {IsPositive, IsString, ValidateNested} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";

export class CrearPublicacionDTO {
    @IsString() public titulo: string
    @IsString() public descripcion: string
    @JSONSchema({example: 2}) @IsPositive() public precioPorNoche: number
    @ValidateNested() public direccion: DireccionDTO
    @JSONSchema({example: 2}) @IsPositive() public cantidadDeHuespedes: number
    // Esto se puede hacer bastante largo...

    constructor(
        titulo: string,
        descripcion: string,
        precioPorNoche: number,
        direccion: DireccionDTO,
        cantidadDeHuespedes: number
    ) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precioPorNoche = precioPorNoche;
        this.direccion = direccion;
        this.cantidadDeHuespedes = cantidadDeHuespedes;
    }
}

export default class CrearPublicacion implements UseCase {
    execute(pedido: CrearPublicacionDTO): PublicacionDTO {
        return new PublicacionDTO(
            'un id',
            'un titulo',
            'una descripcion',
            10,
            new DireccionDTO('una calle', 1234),
            1
        )
    }
}

import DireccionDTO from "./DireccionDTO";
import {JSONSchema} from "class-validator-jsonschema";
import {IsInt, IsString, ValidateNested} from "class-validator";

class PublicacionDTO {
    @IsString() public id: string
    @JSONSchema({example: "un titulo"}) @IsString() public titulo: string
    @IsString() public descripcion: string
    @JSONSchema({example: 2})  @IsInt() public precioPorNoche: number
    @ValidateNested() public direccion: DireccionDTO
    @JSONSchema({example: 2})  @IsInt() public cantidadDeHuespedes: number

    constructor(
        id: string,
        titulo: string,
        descripcion: string,
        precioPorNoche: number,
        direccion: DireccionDTO,
        cantidadDeHuespedes: number
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precioPorNoche = precioPorNoche;
        this.direccion = direccion;
        this.cantidadDeHuespedes = cantidadDeHuespedes;
    }
}

export default PublicacionDTO

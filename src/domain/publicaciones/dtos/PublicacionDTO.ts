import DireccionDTO from "./DireccionDTO";
import {JSONSchema} from "class-validator-jsonschema";
import {IsInt, IsString, ValidateNested} from "class-validator";
import Publicacion from "../entidades/Publicacion";

class PublicacionDTO {
    @IsString() public id!: string
    @JSONSchema({example: "un titulo"}) @IsString() public titulo!: string
    @IsString() public descripcion!: string
    @JSONSchema({example: 2})  @IsInt() public precioPorNoche!: number
    @ValidateNested() public direccion!: DireccionDTO
    @JSONSchema({example: 2})  @IsInt() public cantidadDeHuespedes!: number

    constructor(publicacion: Publicacion) {
        Object.assign(this, publicacion)
    }
}

export default PublicacionDTO

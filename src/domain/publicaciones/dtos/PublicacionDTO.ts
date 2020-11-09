import {JSONSchema} from "class-validator-jsonschema";
import {IsInt, IsString, ValidateNested} from "class-validator";
import Publicacion from "../entidades/Publicacion";
import {Type} from "class-transformer";
import Direccion from "../../lugares/entidades/Direccion";

class PublicacionDTO {
    @IsString()
    public id!: string

    @JSONSchema({example: "un titulo"}) @IsString()
    public titulo!: string

    @IsString()
    public descripcion!: string

    @JSONSchema({example: 2})  @IsInt()
    public precioPorNoche!: number

    @ValidateNested() @Type(() => Direccion)
    public direccion!: Direccion

    @JSONSchema({example: 2}) @IsInt()
    public cantidadDeHuespedes!: number

    @IsString()
    public anfitrionId!: string

    constructor(publicacion: Publicacion) {
        Object.assign(this, publicacion)
    }
}

export default PublicacionDTO

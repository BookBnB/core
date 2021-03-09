import {JSONSchema} from "class-validator-jsonschema";
import {IsBoolean, IsEnum, IsInt, IsNumber, IsString, IsUrl, ValidateNested} from "class-validator";
import Publicacion, {TipoDeAlojamiento} from "../entidades/Publicacion";
import {Type} from "class-transformer";
import Direccion from "../../lugares/entidades/Direccion";
import Imagen from "../entidades/Imagen";

class PublicacionDTO {
    @IsString()
    public id!: string

    @JSONSchema({example: "un titulo"}) @IsString()
    public titulo!: string

    @IsString()
    public descripcion!: string

    @JSONSchema({example: 2}) @IsInt()
    public precioPorNoche!: number

    @ValidateNested() @Type(() => Direccion)
    public direccion!: Direccion

    @JSONSchema({example: 2}) @IsInt()
    public cantidadDeHuespedes!: number

    @IsEnum(TipoDeAlojamiento)
    public tipoDeAlojamiento!: string

    @IsString()
    public anfitrionId!: string

    @ValidateNested({each: true}) @Type(() => Imagen)
    public imagenes: Imagen[] = []

    @IsString()
    public estado!: string

    @IsNumber()
    public calificacion: number | null

    @IsBoolean()
    public bloqueada!: boolean

    constructor(publicacion: Publicacion) {
        Object.assign(this, publicacion)
        this.estado = publicacion.estado.toString()
        this.calificacion = publicacion.calificacion()
    }
}

export default PublicacionDTO

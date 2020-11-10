import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import {IsOptional, IsPositive, IsString, MinLength, ValidateNested} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import {Type} from "class-transformer";
import Usuario from "../../usuarios/entidades/Usuario";
import Direccion, {DireccionConstructor} from "../../lugares/entidades/Direccion";
import Imagen from "../entidades/Imagen";

export interface CrearPublicacionDTOConstructor {
    titulo: string
    descripcion: string
    precioPorNoche: number
    direccion: Direccion,
    cantidadDeHuespedes: number,
    imagenes: Imagen[]
}

export class CrearPublicacionDTO {
    @IsString() @MinLength(3)
    public titulo!: string

    @IsString() @MinLength(3)
    public descripcion!: string

    @JSONSchema({example: 2}) @IsPositive()
    public precioPorNoche!: number

    @ValidateNested() @Type(() => Direccion)
    public direccion!: DireccionConstructor

    @JSONSchema({example: 2}) @IsPositive()
    public cantidadDeHuespedes!: number

    @ValidateNested({each: true}) @Type(() => Imagen) @IsOptional()
    public imagenes!: Imagen[]

    constructor(args: CrearPublicacionDTOConstructor) {
        Object.assign(this, args);
    }
}

export class CrearPublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(usuario: Usuario, pedido: CrearPublicacionDTO): Promise<PublicacionDTO> {
        const publicacion = new Publicacion({
            ...pedido,
            anfitrion: usuario
        })
        await this.publicaciones.guardar(publicacion)
        return new PublicacionDTO(publicacion)
    }
}

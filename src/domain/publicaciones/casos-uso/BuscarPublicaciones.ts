import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion, {TipoDeAlojamiento} from "../entidades/Publicacion";
import ConsultaConPaginacion from "../../common/ConsultaConPaginacion";
import {IsDefined, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {Coordenadas} from "../../lugares/entidades/Lugar";
import {JSONSchema} from "class-validator-jsonschema";

export class ConsultaDePublicaciones extends ConsultaConPaginacion {
    @ValidateNested() @IsDefined() @Type(() => Coordenadas)
    public coordenadas!: Coordenadas;

    @IsInt() @IsPositive() @IsOptional()
    @JSONSchema({description: 'El radio en metros para buscar alrededor de la latitud y longitud. Por defecto son 1000 metros.'})
    public radio: number = 1000

    @IsInt() @IsPositive() @IsOptional()
    public cantidadDeHuespedes?: number = undefined

    @IsEnum(TipoDeAlojamiento) @IsOptional()
    public tipoDeAlojamiento?: TipoDeAlojamiento = undefined

    @IsNumber() @IsPositive() @IsOptional()
    public precioPorNocheMinimo?: number = undefined

    @IsNumber() @IsPositive() @IsOptional()
    public precioPorNocheMaximo?: number = undefined
}

export class BuscarPublicaciones implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(consulta: ConsultaDePublicaciones): Promise<PublicacionDTO[]> {
        return (await this.publicaciones.listar(consulta))
            .map((publicacion: Publicacion): PublicacionDTO =>
                new PublicacionDTO(publicacion))
    }
}

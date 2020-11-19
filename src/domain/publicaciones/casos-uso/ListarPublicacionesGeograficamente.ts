import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import ConsultaConPaginacion from "../../common/ConsultaConPaginacion";
import {IsDefined, IsInt, IsOptional, IsPositive, IsUUID, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {Coordenadas} from "../../lugares/entidades/Lugar";
import {JSONSchema} from "class-validator-jsonschema";
import UUID from "../../common/UUID";

export class ConsultaGeograficaDePublicaciones extends ConsultaConPaginacion {
    @ValidateNested() @IsDefined() @Type(() => Coordenadas)
    public coordenadas!: Coordenadas;

    @IsInt() @IsPositive() @IsOptional()
    @JSONSchema({description: 'El radio en metros para buscar alrededor de la latitud y longitud. Por defecto son 1000 metros.'})
    public radio: number = 1000
}

export class ListarPublicacionesGeograficamente implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(consulta: ConsultaGeograficaDePublicaciones): Promise<PublicacionDTO[]> {
        return (await this.publicaciones.listar(consulta))
            .map((publicacion: Publicacion): PublicacionDTO =>
                new PublicacionDTO(publicacion))
    }
}
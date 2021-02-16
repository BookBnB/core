import {UseCase} from "../../UseCase";
import {IsInt, IsOptional, IsString, Max, Min} from "class-validator";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Usuario from "../../usuarios/entidades/Usuario";
import CalificacionDePublicacionDTO from "../dtos/CalificacionDePublicacionDTO";


export interface CalificarPublicacionDTOConstructor {
    puntos: number
    detalle?: string
}

export class CalificarPublicacionDTO {

    @IsInt() @Min(1) @Max(5)
    public puntos!: number;

    @IsString() @IsOptional()
    public detalle?: string;

    constructor(args: CalificarPublicacionDTOConstructor) {
        Object.assign(this, args);
    }
}

export class CalificarPublicacion implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) {
    }

    async execute(usuario: Usuario, publicacionId: string, calificacion: CalificarPublicacionDTO): Promise<CalificacionDePublicacionDTO> {
        const publicacion = await this.publicaciones.obtener(publicacionId)

        return new CalificacionDePublicacionDTO(publicacion.calificar(usuario, calificacion))
    }
}

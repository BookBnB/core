import {IsInt, IsOptional, IsString, Max, Min} from "class-validator";
import CalificacionDePublicacion from "../entidades/CalificacionDePublicacion";

export default class CalificacionDePublicacionDTO {
    @IsInt() @Min(1) @Max(5)
    public puntos: number;

    @IsString() @IsOptional()
    public detalle: string;

    @IsString()
    public huespedId: string

    @IsString()
    public publicacionId: string

    constructor(calificacion: CalificacionDePublicacion) {
        this.puntos = calificacion.puntos
        this.detalle = calificacion.detalle || ''
        this.huespedId = calificacion.huesped.id
        this.publicacionId = calificacion.publicacion.id as string
    }
}

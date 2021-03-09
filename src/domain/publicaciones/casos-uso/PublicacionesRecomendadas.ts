import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import Usuario from "../../usuarios/entidades/Usuario";

export class PublicacionesRecomendadas implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(usuario: Usuario): Promise<PublicacionDTO[]> {

        return (await this.publicaciones.mejorCalificadas(4))
            .map((publicacion: Publicacion): PublicacionDTO =>
                new PublicacionDTO(publicacion))
    }
}

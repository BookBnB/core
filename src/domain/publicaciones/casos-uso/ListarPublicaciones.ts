import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";

export class ListarPublicaciones implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute({offset, limit}: {offset: number, limit: number}): Promise<PublicacionDTO[]> {
        return (await this.publicaciones.listar(offset, limit))
            .map((publicacion: Publicacion): PublicacionDTO =>
                new PublicacionDTO(publicacion))
    }
}

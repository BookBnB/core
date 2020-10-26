import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";

export class VerPublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(id: string): Promise<PublicacionDTO> {
        const publicacion = await this.publicaciones.obtener(id)
        return new PublicacionDTO(publicacion)
    }
}

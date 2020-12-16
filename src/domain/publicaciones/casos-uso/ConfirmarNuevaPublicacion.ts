import { EstadoPublicacion } from "../entidades/Publicacion";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import { UseCase } from "../../UseCase";

export class ConfirmarNuevaPublicacion implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) { 
    }

    async execute(params: any) {
        const publicacion = await this.publicaciones.obtener(params.idPublicacion)

        publicacion.estado = EstadoPublicacion.creada
        publicacion.contratoId = params.contratoId

        await this.publicaciones.guardar(publicacion)
    }
}

import { EstadoPublicacion } from "../../publicaciones/entidades/Publicacion";
import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import { UseCase } from "../../UseCase";

export class EventoNuevaPublicacion implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) { 
    }

    async execute(params: any) {
        const publicacion = await this.publicaciones.obtener(params.idPublicacion)

        publicacion.estado = EstadoPublicacion.creada
        publicacion.idEnContrato = params.idEnContrato

        await this.publicaciones.guardar(publicacion)
    }
}

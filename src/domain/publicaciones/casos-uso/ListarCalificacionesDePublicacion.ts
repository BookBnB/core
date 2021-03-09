import {UseCase} from "../../UseCase";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import CalificacionDePublicacionDTO from "../dtos/CalificacionDePublicacionDTO";

export class ListarCalificacionesDePublicacion implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) {
    }

    async execute(publicacionId: string): Promise<CalificacionDePublicacionDTO[]> {
        const publicacion = await this.publicaciones.obtener(publicacionId)

        return publicacion.calificaciones.map(calificacion => {
            calificacion.publicacion = publicacion
            return new CalificacionDePublicacionDTO(calificacion)
        })
    }
}

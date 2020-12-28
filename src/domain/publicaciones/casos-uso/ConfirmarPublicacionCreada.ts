import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import { UseCase } from "../../UseCase";

export interface ConfirmarNuevaPublicacionDTO {
    publicacionId: string
    contratoId: number
}

export class ConfirmarPublicacionCreada implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) { 
    }

    async execute(params: ConfirmarNuevaPublicacionDTO) {
        const publicacion = await this.publicaciones.obtener(params.publicacionId)

        publicacion.confirmar()
        publicacion.setContratoId(params.contratoId)

        await this.publicaciones.guardar(publicacion)
    }
}

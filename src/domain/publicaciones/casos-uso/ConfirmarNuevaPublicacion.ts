import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import { UseCase } from "../../UseCase";

interface ParametrosConfirmarNuevaPublicacion {
    publicacionId: string
    contratoId: number
}

export class ConfirmarNuevaPublicacion implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) { 
    }

    async execute(params: ParametrosConfirmarNuevaPublicacion) {
        const publicacion = await this.publicaciones.obtener(params.publicacionId)

        publicacion.confirmar()
        publicacion.setContratoId(params.contratoId)

        await this.publicaciones.guardar(publicacion)
    }
}

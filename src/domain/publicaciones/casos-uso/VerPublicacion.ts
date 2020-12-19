import {UseCase} from "../../UseCase";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";

export class VerPublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    execute(id: string): Promise<Publicacion> {
        return this.publicaciones.obtener(id)
    }
}

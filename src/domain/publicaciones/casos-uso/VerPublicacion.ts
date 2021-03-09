import { UseCase } from "../../UseCase";
import Usuario from "../../usuarios/entidades/Usuario";
import Publicacion from "../entidades/Publicacion";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";

export class VerPublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    execute(id: string): Promise<Publicacion> {
        return this.publicaciones.obtener(id)
    }
}

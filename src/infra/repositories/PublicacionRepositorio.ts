import {Repository} from "typeorm";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";

export default class PublicacionRepositorio implements IPublicacionRepositorio {
    public constructor(private readonly repo: Repository<Publicacion>) {
    }

    guardar(publicacion: Publicacion): Promise<Publicacion> {
        return this.repo.save(publicacion)
    }
}

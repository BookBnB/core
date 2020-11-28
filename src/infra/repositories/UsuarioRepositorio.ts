import {EntityManager} from "typeorm";
import IUsuarioRepositorio from "../../domain/usuarios/repositorios/UsuarioRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";

export default class UsuarioRepositorio implements IUsuarioRepositorio {
    public constructor(private readonly em: EntityManager) {
    }

    async obtenerPublicaciones(id: string): Promise<Publicacion[]> {
        return await this.em.createQueryBuilder(Publicacion, "publicacion")
            .leftJoinAndSelect("publicacion.imagenes", "imagenes")
            .where("publicacion.anfitrion.id = :id", {id: id})
            .getMany()
    }
}

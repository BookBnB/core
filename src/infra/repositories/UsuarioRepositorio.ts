import {Repository} from "typeorm";
import IUsuarioRepositorio from "../../domain/usuarios/repositorios/UsuarioRepositorio";
import Usuario from "../../domain/usuarios/entidades/Usuario";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";

export default class UsuarioRepositorio implements IUsuarioRepositorio {
    public constructor(private readonly repo: Repository<Usuario>) {
    }

    async obtenerPublicaciones(id: string): Promise<Publicacion[]> {
        const usuario = await this.repo.findOne(id, {relations: ["publicaciones"]});
        return usuario?.publicaciones ?? [];
    }
}

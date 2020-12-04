import {Repository} from "typeorm";
import IPreguntaRepositorio from "../../domain/publicaciones/repositorios/PreguntaRepositorio";
import Pregunta from "../../domain/publicaciones/entidades/Pregunta";
import ConsultaConPaginacion from "../../domain/common/ConsultaConPaginacion";

export default class PreguntaRepositorio implements IPreguntaRepositorio {
    public constructor(private readonly repo: Repository<Pregunta>) {
    }

    listar(publicacionId: string, consulta: ConsultaConPaginacion): Promise<Pregunta[]> {
        return this.repo.createQueryBuilder("pregunta")
            .skip(consulta.offset)
            .take(consulta.limit)
            .where("pregunta.publicacion.id = :publicacionId", {publicacionId})
            .leftJoinAndSelect("pregunta.respuesta", "respuesta")
            .getMany()
    }
}

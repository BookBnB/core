import {Repository} from "typeorm";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import PublicacionInexistenteError from "../../domain/publicaciones/excepciones/PublicacionInexistenteError";
import {ConsultaDePublicaciones} from "../../domain/publicaciones/casos-uso/ListarPublicaciones";

export default class PublicacionRepositorio implements IPublicacionRepositorio {
    public constructor(private readonly repo: Repository<Publicacion>) {
    }

    guardar(publicacion: Publicacion): Promise<Publicacion> {
        return this.repo.save(publicacion)
    }

    async obtener(id: string): Promise<Publicacion> {
        const publicacion = await this.repo.findOne(id);
        if (!publicacion)
            throw new PublicacionInexistenteError(`La publicación con id ${id} no existe.`)
        return publicacion;
    }

    listar(consulta: ConsultaDePublicaciones): Promise<Publicacion[]> {
        return this.repo.createQueryBuilder()
            .where("ST_DWithin(Geography(\"direccionCoordenadas\"), ST_SetSRID(ST_MakePoint(:latitud, :longitud), 4326), :radio)")
            .skip(consulta.offset)
            .take(consulta.limit)
            .setParameters({
                latitud: consulta.coordenadas.latitud,
                longitud: consulta.coordenadas.longitud,
                radio: consulta.radio
            })
            .getMany()
    }
}

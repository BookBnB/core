import {Repository} from "typeorm";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import PublicacionInexistenteError from "../../domain/publicaciones/excepciones/PublicacionInexistenteError";
import {ConsultaGeograficaDePublicaciones} from "../../domain/publicaciones/casos-uso/ListarPublicacionesGeograficamente";

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

    listar(consulta: ConsultaGeograficaDePublicaciones): Promise<Publicacion[]> {
        return this.repo.createQueryBuilder("publicacion")
            .orderBy("publicacion.titulo")
            .skip(consulta.offset)
            .take(consulta.limit)
            .leftJoinAndSelect("publicacion.anfitrion", "anfitrion")
            .leftJoinAndSelect("publicacion.imagenes", "imagenes")
            .where("ST_DWithin(Geography(\"direccionCoordenadas\"), ST_SetSRID(ST_MakePoint(:latitud, :longitud), 4326), :radio)")
            .setParameters({
                latitud: consulta.coordenadas.latitud,
                longitud: consulta.coordenadas.longitud,
                radio: consulta.radio
            })
            .getMany();
    }
}

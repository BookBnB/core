import {Repository, SelectQueryBuilder} from "typeorm";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import PublicacionInexistenteError from "../../domain/publicaciones/excepciones/PublicacionInexistenteError";
import {ConsultaGeograficaDePublicaciones} from "../../domain/publicaciones/casos-uso/ListarPublicacionesGeograficamente";
import { ConsultaDePublicacionesPorAnfitrion } from "../../domain/publicaciones/casos-uso/ListarPublicacionesPorAnfitrion";
import ConsultaConPaginacion from "../../domain/common/ConsultaConPaginacion";

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

    private listarBase(consulta: ConsultaConPaginacion): SelectQueryBuilder<Publicacion> {
        return this.repo.createQueryBuilder("publicacion")
                        .orderBy("publicacion.titulo")
                        .skip(consulta.offset)
                        .take(consulta.limit)
                        .leftJoinAndSelect("publicacion.imagenes", "imagenes");
    }

    listar(consulta: ConsultaGeograficaDePublicaciones): Promise<Publicacion[]> {
        return this.listarBase(consulta)
                .where("ST_DWithin(Geography(\"direccionCoordenadas\"), ST_SetSRID(ST_MakePoint(:latitud, :longitud), 4326), :radio)")
                .setParameters({
                    latitud: consulta.coordenadas.latitud,
                    longitud: consulta.coordenadas.longitud,
                    radio: consulta.radio
                })
                .getMany();
    }

    listarPorAnfitrion(consulta: ConsultaDePublicacionesPorAnfitrion): Promise<Publicacion[]> {
        return this.listarBase(consulta)
                .where("publicacion.\"anfitrionId\" = :anfitrionId")
                .setParameter("anfitrionId", consulta.anfitrionId.id)
                .getMany();
    }
}

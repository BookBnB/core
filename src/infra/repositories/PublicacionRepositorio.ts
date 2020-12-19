import {Connection, Repository} from "typeorm";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion, {EstadoPublicacion} from "../../domain/publicaciones/entidades/Publicacion";
import PublicacionInexistenteError from "../../domain/publicaciones/excepciones/PublicacionInexistenteError";
import {ConsultaDePublicaciones} from "../../domain/publicaciones/casos-uso/BuscarPublicaciones";
import Pregunta from "../../domain/publicaciones/entidades/Pregunta";

export class PublicacionRepositorio implements IPublicacionRepositorio {
    public constructor(private readonly repo: Repository<Publicacion>,
                       private readonly connection: Connection) {
    }

    guardar(publicacion: Publicacion): Promise<Publicacion> {
        return this.repo.save(publicacion)
    }

    guardarPregunta(pregunta: Pregunta): Promise<Pregunta> {
        return this.connection.manager.save(pregunta)
    }

    async obtener(id: string): Promise<Publicacion> {
        const publicacion = await this.repo.findOne(id);
        if (!publicacion)
            throw new PublicacionInexistenteError(`La publicación con id ${id} no existe.`)
        return publicacion
    }

    listar({
               offset, limit, radio, coordenadas, cantidadDeHuespedes, tipoDeAlojamiento,
               precioPorNocheMinimo, precioPorNocheMaximo
           }: ConsultaDePublicaciones): Promise<Publicacion[]> {
        return this.repo.createQueryBuilder("publicacion")
            .orderBy("publicacion.titulo")
            .skip(offset)
            .take(limit)
            .leftJoinAndSelect("publicacion.imagenes", "imagenes")
            .where("ST_DWithin(Geography(\"direccionCoordenadas\"), ST_SetSRID(ST_MakePoint(:latitud, :longitud), 4326), :radio)")
            .andWhere("publicacion.estado = :estado")
            .andWhere(tipoDeAlojamiento ? "publicacion.tipoDeAlojamiento = :tipoDeAlojamiento" : "TRUE")
            .andWhere(cantidadDeHuespedes ? "publicacion.cantidadDeHuespedes >= :cantidadDeHuespedes" : "TRUE")
            .andWhere(precioPorNocheMinimo ? "publicacion.precioPorNoche >= :precioPorNocheMinimo" : "TRUE")
            .andWhere(precioPorNocheMaximo ? "publicacion.precioPorNoche <= :precioPorNocheMaximo" : "TRUE")
            .setParameters({
                latitud: coordenadas.latitud,
                longitud: coordenadas.longitud,
                radio,
                estado: EstadoPublicacion.creada,
                tipoDeAlojamiento,
                cantidadDeHuespedes,
                precioPorNocheMinimo,
                precioPorNocheMaximo
            })
            .getMany();
    }
}

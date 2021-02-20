import {Connection, Repository} from "typeorm";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import PublicacionInexistenteError from "../../domain/publicaciones/excepciones/PublicacionInexistenteError";
import {ConsultaDePublicaciones} from "../../domain/publicaciones/casos-uso/BuscarPublicaciones";
import Pregunta from "../../domain/publicaciones/entidades/Pregunta";
import Creada from "../../domain/publicaciones/entidades/estados-publicacion/Creada";

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
               precioPorNocheMinimo, precioPorNocheMaximo, fechaInicio, fechaFin, estado
           }: ConsultaDePublicaciones): Promise<Publicacion[]> {
        return this.repo.createQueryBuilder("publicacion")
            .orderBy("publicacion.titulo")
            .skip(offset)
            .take(limit)
            .leftJoinAndSelect("publicacion.imagenes", "imagen")
            .leftJoin("publicacion.reservas", "reserva", "reserva.estado = 'aceptada'")
            .where("ST_DWithin(Geography(\"direccionCoordenadas\"), ST_SetSRID(ST_MakePoint(:latitud, :longitud), 4326), :radio)")
            .andWhere(estado ? "publicacion.estado = :estado" : "TRUE")
            .andWhere(tipoDeAlojamiento ? "publicacion.tipoDeAlojamiento = :tipoDeAlojamiento" : "TRUE")
            .andWhere(cantidadDeHuespedes ? "publicacion.cantidadDeHuespedes >= :cantidadDeHuespedes" : "TRUE")
            .andWhere(precioPorNocheMinimo ? "publicacion.precioPorNoche >= :precioPorNocheMinimo" : "TRUE")
            .andWhere(precioPorNocheMaximo ? "publicacion.precioPorNoche <= :precioPorNocheMaximo" : "TRUE")
            .andWhere(precioPorNocheMaximo ? "publicacion.precioPorNoche <= :precioPorNocheMaximo" : "TRUE")
            .andWhere(fechaInicio && fechaFin ? "(reserva IS NULL) OR NOT (reserva.fechaInicio < :fechaFin AND :fechaInicio < reserva.fechaFin)" : "TRUE")
            .setParameters({
                latitud: coordenadas.latitud,
                longitud: coordenadas.longitud,
                radio,
                estado,
                tipoDeAlojamiento,
                cantidadDeHuespedes,
                precioPorNocheMinimo,
                precioPorNocheMaximo,
                fechaInicio,
                fechaFin
            }).getMany()
    }
}

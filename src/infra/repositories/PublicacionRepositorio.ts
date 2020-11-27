import {Repository} from "typeorm";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import PublicacionInexistenteError from "../../domain/publicaciones/excepciones/PublicacionInexistenteError";
import {ConsultaDePublicaciones} from "../../domain/publicaciones/casos-uso/BuscarPublicaciones";

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

    listar({
               offset, limit, radio, coordenadas, cantidadDeHuespedes, tipoDeAlojamiento,
               precioPorNocheMinimo
           }: ConsultaDePublicaciones): Promise<Publicacion[]> {
        return this.repo.createQueryBuilder("publicacion")
            .orderBy("publicacion.titulo")
            .skip(offset)
            .take(limit)
            .leftJoinAndSelect("publicacion.imagenes", "imagenes")
            .where("ST_DWithin(Geography(\"direccionCoordenadas\"), ST_SetSRID(ST_MakePoint(:latitud, :longitud), 4326), :radio)")
            .andWhere(tipoDeAlojamiento ? "publicacion.tipoDeAlojamiento = :tipoDeAlojamiento" : "TRUE")
            .andWhere(cantidadDeHuespedes ? "publicacion.cantidadDeHuespedes >= :cantidadDeHuespedes" : "TRUE")
            .andWhere(precioPorNocheMinimo ? "publicacion.precioPorNoche >= :precioPorNocheMinimo" : "TRUE")
            .setParameters({
                latitud: coordenadas.latitud,
                longitud: coordenadas.longitud,
                radio,
                tipoDeAlojamiento,
                cantidadDeHuespedes,
                precioPorNocheMinimo
            })
            .getMany();
    }
}

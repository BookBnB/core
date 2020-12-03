import Publicacion from "../entidades/Publicacion";
import {ConsultaDePublicaciones} from "../casos-uso/BuscarPublicaciones";
import Pregunta from "../entidades/Pregunta";

export default interface IPublicacionRepositorio {
    guardar(publicacion: Publicacion): Promise<Publicacion>;

    guardarPregunta(pregunta: Pregunta): Promise<Pregunta>;

    obtener(id: string): Promise<Publicacion>;

    listar(consulta: ConsultaDePublicaciones): Promise<Publicacion[]>;
}

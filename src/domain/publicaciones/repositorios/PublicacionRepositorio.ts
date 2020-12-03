import Publicacion from "../entidades/Publicacion";
import {ConsultaDePublicaciones} from "../casos-uso/BuscarPublicaciones";
import Pregunta from "../entidades/Pregunta";
import Respuesta from "../entidades/Respuesta";

export default interface IPublicacionRepositorio {
    guardar(publicacion: Publicacion): Promise<Publicacion>;

    guardarPregunta(pregunta: Pregunta): Promise<Pregunta>;

    guardarRespuesta(respuestaEntidad: Respuesta): Promise<Respuesta>;

    obtener(id: string): Promise<Publicacion>;

    listar(consulta: ConsultaDePublicaciones): Promise<Publicacion[]>;
}

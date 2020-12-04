import {UseCase} from "../../UseCase";
import Usuario from "../../usuarios/entidades/Usuario";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import Pregunta from "../entidades/Pregunta";
import PreguntaDTO from "../dtos/PreguntaDTO";

export class PreguntarEnPublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(idPublicacion: string, usuario: Usuario, descripcion: string): Promise<PreguntaDTO> {
        const publicacion: Publicacion = await this.publicaciones.obtener(idPublicacion)
        const entidadPregunta: Pregunta = await publicacion.preguntar(usuario, descripcion)
        return new PreguntaDTO(await this.publicaciones.guardarPregunta(entidadPregunta))
    }
}

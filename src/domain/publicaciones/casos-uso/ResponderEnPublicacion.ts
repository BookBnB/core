import {UseCase} from "../../UseCase";
import Usuario from "../../usuarios/entidades/Usuario";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import Pregunta from "../entidades/Pregunta";
import PreguntaDTO from "../dtos/PreguntaDTO";

export class ResponderEnPublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(idPublicacion: string, idPregunta: string, usuario: Usuario, respuesta: string): Promise<PreguntaDTO> {
        const publicacion: Publicacion = await this.publicaciones.obtener(idPublicacion)
        const pregunta: Pregunta = await publicacion.responder(idPregunta, respuesta, usuario)
        await this.publicaciones.guardarPregunta(pregunta)
        return new PreguntaDTO(pregunta)
    }
}

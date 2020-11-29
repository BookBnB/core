import {UseCase} from "../../UseCase";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import Pregunta from "../entidades/Pregunta";
import PreguntaDTO from "../dtos/PreguntaDTO";

export class ListarPreguntasDePublicacion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(idPublicacion: string): Promise<PreguntaDTO[]> {
        const publicacion: Publicacion = await this.publicaciones.obtener(idPublicacion)
        return (await publicacion.preguntas).map((pregunta: Pregunta) => new PreguntaDTO(pregunta))
    }
}

import {UseCase} from "../../UseCase";
import Pregunta from "../entidades/Pregunta";
import PreguntaDTO from "../dtos/PreguntaDTO";
import IPreguntaRepositorio from "../repositorios/PreguntaRepositorio";
import ConsultaConPaginacion from "../../common/ConsultaConPaginacion";

export class ListarPreguntasDePublicacion implements UseCase {
    constructor(private readonly preguntas: IPreguntaRepositorio) {
    }

    async execute(publicacionId: string, consulta: ConsultaConPaginacion): Promise<PreguntaDTO[]> {
        return (await this.preguntas.listar(publicacionId, consulta))
            .map((pregunta: Pregunta) => new PreguntaDTO(pregunta))
    }
}

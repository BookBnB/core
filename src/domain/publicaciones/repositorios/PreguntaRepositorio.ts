import Pregunta from "../entidades/Pregunta";
import ConsultaConPaginacion from "../../common/ConsultaConPaginacion";

export default interface IPreguntaRepositorio {
    listar(publicacionId: string, consulta: ConsultaConPaginacion): Promise<Pregunta[]>;
}

import Publicacion from "../entidades/Publicacion";
import {ConsultaDePublicaciones} from "../casos-uso/BuscarPublicaciones";
import Pregunta from "../entidades/Pregunta";
import { ParametrosReporte } from "../../reportes/entidades/ParametrosReporte";

export default interface IPublicacionRepositorio {
    guardar(publicacion: Publicacion): Promise<Publicacion>;

    guardarPregunta(pregunta: Pregunta): Promise<Pregunta>;

    obtener(id: string): Promise<Publicacion>;

    listar(consulta: ConsultaDePublicaciones): Promise<Publicacion[]>;

    publicacionesCreadasPorDia(fechaInicio: Date, fechaFin: Date): Promise<any[]>

    mejorCalificadas(cantidad: number): Promise<Publicacion[]>;
}

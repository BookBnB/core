import Direccion from "../entidades/Direccion";
import ConsultaDeLugar from "../casos-uso/ConsultaDeLugar";

export default interface IServicioLugares {
    buscarDirecciones(consulta: ConsultaDeLugar, ip: string): Promise<Direccion[]>
}

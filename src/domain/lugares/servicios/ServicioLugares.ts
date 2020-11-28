import Direccion from "../entidades/Direccion";
import ConsultaDeLugar from "../casos-uso/ConsultaDeLugar";
import Ciudad from "../entidades/Ciudad";

export default interface IServicioLugares {
    buscarDirecciones(consulta: ConsultaDeLugar, ip: string): Promise<Direccion[]>

    buscarCiudades(consulta: ConsultaDeLugar, ip: string): Promise<Ciudad[]>;
}

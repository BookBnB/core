import {ConsultaDeDireccion} from "../casos-uso/BuscarDirecciones";
import Direccion from "../entidades/Direccion";

export default interface IServicioDirecciones {
    buscarDirecciones(consulta: ConsultaDeDireccion, ip: string): Promise<Direccion[]>
}

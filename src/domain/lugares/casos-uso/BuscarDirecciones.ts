import {UseCase} from "../../UseCase";
import Direccion from "../entidades/Direccion";
import IServicioDirecciones from "../servicios/ServicioLugares";
import ConsultaDeLugar from "./ConsultaDeLugar";

export class BuscarDirecciones implements UseCase {
    constructor(private readonly direcciones: IServicioDirecciones) {
    }

    async execute(consulta: ConsultaDeLugar, ip: string): Promise<Direccion[]> {
        return this.direcciones.buscarDirecciones(consulta, ip)
    }
}

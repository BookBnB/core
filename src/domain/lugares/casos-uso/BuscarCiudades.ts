import {UseCase} from "../../UseCase";
import IServicioLugares from "../servicios/ServicioLugares";
import ConsultaDeLugar from "./ConsultaDeLugar";
import Ciudad from "../entidades/Ciudad";

export class BuscarCiudades implements UseCase {
    constructor(private readonly lugares: IServicioLugares) {
    }

    async execute(consulta: ConsultaDeLugar, ip: string): Promise<Ciudad[]> {
        return this.lugares.buscarCiudades(consulta, ip)
    }
}

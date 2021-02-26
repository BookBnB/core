import { World } from "cucumber";
import Recurso from "../../util/Recurso";

export default class Reportes extends Recurso {
    static readonly BASE_URL: string = '/v1/reportes'

    protected static baseUlr(): string {
        return this.BASE_URL
    }

    public static async publicaciones(context: World, fechaInicio: string, fechaFin: string) {
        await this.get(context, `/publicaciones`, {
            fechaInicio,
            fechaFin
        })
    }

    public static async reservas(context: World, fechaInicio: string, fechaFin: string) {
        await this.get(context, `/reservas`, {
            fechaInicio,
            fechaFin
        })
    }
}
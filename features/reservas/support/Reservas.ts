import chai from "chai";
import chaiHttp from "chai-http";
import Recurso from "../../util/Recurso";
import {World} from "cucumber";

chai.use(chaiHttp);

export default class Reservas extends Recurso {
    protected static baseUlr(): string {
        return '/v1/reservas';
    }

    public static ejemplo(publicacionId: string) {
        return {
            publicacionId: publicacionId,
            fechaInicio: new Date('2020-12-01').toISOString(),
            fechaFin: new Date('2020-12-07').toISOString()
        }
    }

    public static async crear(context: World, reserva: any) {
        await this.post(context, '', reserva)
        context.last_reserva = context.last_response
    }

    public static async obtener(context: World, idReserva: any) {
        await this.get(context, `/${idReserva}`)
    }

    public static async aprobar(context: World, id: any) {
        await this.put(context, `/${id}/aprobacion`, { reservaId: id })
    }

    public static async rechazar(context: World, id: any) {
        await this.put(context, `/${id}/rechazo`, { reservaId: id })
    }

    static async listarPorPublicacion(context: World, publicacionId: string, estado: string | undefined = undefined) {
        context.last_response = await chai.request(context.app)
            .get(`/v1/publicaciones/${publicacionId}/reservas`)
            .query({estado: estado})
            .set('authorization', Reservas.tokenActual(context))
    }

    static async listarMisReservas(context: World, usuarioId: string, estado: string | undefined = undefined) {
        context.last_response = await chai.request(context.app)
            .get(`/v1/usuarios/${usuarioId}/reservas`)
            .query({estado: estado})
            .set('authorization', Reservas.tokenActual(context))
    }
}

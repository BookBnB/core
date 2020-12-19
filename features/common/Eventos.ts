import chai from "chai";
import chaiHttp from "chai-http";
import {World} from "cucumber";
import {TipoEvento} from "../../src/application/EventoController";

chai.use(chaiHttp);

export default class Eventos {
    static readonly BASE_URL: string = '/v1/eventos'

    protected static baseUlr(): string {
        return this.BASE_URL;
    }

    public static async notificar(context: World, evento: any) {
        context.last_evento = context.last_response = await chai.request(context.app)
            .post(`${this.baseUlr()}`)
            .type("json")
            .send(evento)
    }

    public static async publicacionRegistrada(context: World, publicacionId: string, contratoId: number = 1) {
        await this.notificar(context, {
            tipo: TipoEvento.NUEVA_PUBLICACION,
            payload: {
                publicacionId,
                contratoId
            }
        })
    }

    public static async publicacionRechazada(context: World, publicacionId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.PUBLICACION_RECHAZADA,
            payload: {
                publicacionId
            }
        })
    }

    public static async reservaRegistrada(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.NUEVA_RESERVA,
            payload: {
                reservaId
            }
        })
    }

    public static async reservaAceptada(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_ACEPTADA,
            payload: {
                reservaId
            }
        })
    }
}

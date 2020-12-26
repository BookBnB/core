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

    private static async notificar(context: World, evento: any) {
        context.last_evento = context.last_response = await chai.request(context.app)
            .post(`${this.baseUlr()}`)
            .type("json")
            .send(evento)
    }

    /*
     * Eventos de publicaciones
     */
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

    /*
     * Eventos de reservas
     */
    public static async registarEstadoPublicacion(context: World, estadoPublicacion: string, publicacionId: string) {
        const estados = new Map([
            ['creada', () => this.publicacionRegistrada(context, publicacionId)],
            ['rechazada', () => this.publicacionRechazada(context, publicacionId)],
            ['pendiente', () => Promise.resolve()]
        ])

        const evento = estados.get(estadoPublicacion)
        if(!evento) throw Error(`Estado de publicación inválido: ${estadoPublicacion}.`)
        await evento();
    }

    public static async registarEstadoDeNuevaReserva(context: World, estadoReserva: string, reservaId: string) {
        const estados = new Map([
            ['creada', () => this.nuevaReservaRegistrada(context, reservaId)],
            ['rechazada', () => this.nuevaReservaRechazada(context, reservaId)],
            ['pendiente', () => Promise.resolve()]
        ])

        const evento = estados.get(estadoReserva)
        if(!evento) throw Error(`Estado de reserva inválido: ${estadoReserva}.`)
        await evento();
    }

    public static async nuevaReservaRegistrada(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.NUEVA_RESERVA,
            payload: {
                reservaId
            }
        })
    }

    public static async nuevaReservaRechazada(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_RECHAZADA,
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

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
    public static async registarEstadoPublicacion(context: World, estadoPublicacion: string, publicacionId: string) {
        const estados = new Map([
            ['creada', () => this.publicacionCreada(context, publicacionId)],
            ['rechazada', () => this.publicacionCreacionFallida(context, publicacionId)],
            ['pendiente', () => Promise.resolve()]
        ])

        const evento = estados.get(estadoPublicacion)
        if(!evento) throw Error(`Estado de publicación inválido: ${estadoPublicacion}.`)
        await evento();
    }

    public static async publicacionCreada(context: World, publicacionId: string, contratoId: number = 1) {
        await this.notificar(context, {
            tipo: TipoEvento.PUBLICACION_CREADA,
            payload: {
                publicacionId,
                contratoId
            }
        })
    }

    public static async publicacionCreacionFallida(context: World, publicacionId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.PUBLICACION_CREACION_FALLIDA,
            payload: {
                publicacionId
            }
        })
    }

    /*
     * Eventos de reservas
     */
    public static async registarEstadoReserva(context: World, estadoReserva: string, reservaId: string) {
        const estados = new Map([
            ['creada', () => this.reservaCreada(context, reservaId)],
            ['rechazada', () => this.reservaRechazada(context, reservaId)],
            ['pendiente', () => Promise.resolve()]
        ])

        const evento = estados.get(estadoReserva)
        if(!evento) throw Error(`Estado de reserva inválido: ${estadoReserva}.`)
        await evento();
    }

    public static async reservaCreada(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_CREADA,
            payload: {
                reservaId
            }
        })
    }

    public static async reservaRechazada(context: World, reservaId: string) {
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

    public static async creacionDeReservaFallido(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_CREACION_FALLIDA,
            payload: {
                reservaId
            }
        })
    }

    public static async aceptacionDeReservaFallida(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_ACEPTACION_FALLIDA,
            payload: {
                reservaId
            }
        })
    }

    public static async rechazoDeReservaFallido(context: World, reservaId: string) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_RECHAZO_FALLIDO,
            payload: {
                reservaId
            }
        })
    }

    public static async cancelacionDeReservaFallida(context: World, reservaId: any) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_CANCELACION_FALLIDA,
            payload: {
                reservaId
            }
        })
    }

    public static async reservaCancelada(context: World, reservaId: any) {
        await this.notificar(context, {
            tipo: TipoEvento.RESERVA_CANCELADA,
            payload: {
                reservaId
            }
        })
    }
}

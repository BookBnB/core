import Recurso from "../../util/Recurso";
import chai from "chai";
import {World} from "cucumber";
import Sesiones from "../../sesiones/support/Sesiones";

export interface Usuario {
    id: string,
    email: string,
    password: string,
    name: string,
    role: string
}

export default class Usuarios extends Recurso {
    static readonly BASE_URL: string = '/v1/usuarios'

    protected static baseUlr(): string {
        return this.BASE_URL;
    }

    public static ejemplo() {
        return {
            name: 'John',
            surname: 'Doe',
            email: 'john@doe.com',
            password: 'password',
            role: 'anfitrión'
        }
    }

    public static roles(): Map<string, string> {
        return new Map([
            ["anfitrión", "host"],
            ["huésped", "guest"]
        ])
    }

    public static async crear(context: World, usuario: any) {
        usuario.role = this.roles().get(usuario.role) || usuario.role
        context.last_response = await chai.request(context.app)
            .post('/v1/usuarios')
            .type('json')
            .send(usuario);

        usuario.id = context.last_response.body.id

        context.last_usuario = context.last_response

        context.sesiones.registrarUsuario(usuario)
        return usuario
    }

    public static async crearConGoogle(context: any, rol: string, token: string) {
        const role = this.roles().get(rol) || rol

        context.last_response = await chai.request(context.app)
            .post('/v1/usuarios/google')
            .type('json')
            .send({role, token});

        context.last_usuario = context.last_response
    }

    public static async crearActual(context: World, rol: string, email: string = 'john@doe.com') {
        const usuario = await this.crear(context, {...this.ejemplo(), role: rol, email})
        context.sesiones.registrarActual(usuario);
        await Sesiones.crear(context, context.last_response.body.email, context.last_response.body.password)
        context.sesiones.setTokenActual(context.last_response.body.token)
    }

    public static async listarPublicaciones(context: any, anfitrionId: string) {
        await this.get(context, `/${anfitrionId}/publicaciones`)
    }
}

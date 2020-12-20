import chai from "chai";
import chaiHttp from "chai-http";
import {World} from "cucumber";
import {rest} from "msw";
import {generateToken} from "../../doubles/handlers";

chai.use(chaiHttp);

export default class Sesiones {
    static SESION_GOOGLE_URL = `${process.env['USERS_SERVICE_URL']}/v1/sesiones/google`

    public static async crear(context: World, email: string | null, password: string | null) {
        context.last_response = await chai.request(context.app)
            .post('/v1/sesiones')
            .type('json')
            .send({
                email: email,
                password: password
            });

        if (password && email && context.last_response.body.token) {
            const token: string = context.last_response.body.token;
            context.sesiones.registrarSesion(email, token)
        }
    }

    public static async crearConGoogle(context: World) {
        context.last_response = await chai.request(context.app)
            .post('/v1/sesiones/google')
            .type('json')
            .send({token: 'some token'});
    }

    public static mockTokenValido(context: World, email: string) {
        const mockedToken: string = generateToken(email)

        context.mockServer.use(rest.post(this.SESION_GOOGLE_URL, (req, res, context) => {
            return res(context.json({
                token: mockedToken
            }))
        }))
    }

    static mockTokenInvalido(context: World) {
        context.mockServer.use(rest.post(this.SESION_GOOGLE_URL, (req, res, context) => {
            return res(
                context.status(400),
                context.json({
                    error: 'TokenError',
                    message: "Wrong number of segments in token: b'string'"
                }))
        }))
    }

    static mockTokenDeUsuarioNoRegistrado(context: World) {
        context.mockServer.use(rest.post(this.SESION_GOOGLE_URL, (req, res, context) => {
            return res(
                context.status(401),
                context.json({
                    message: "User not recognized"
                }))
        }))
    }
}

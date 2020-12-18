import {rest} from 'msw';
import JWTTokenBuilder from '../../src/infra/servicios/JWTTokenBuilder';
import Store from '../util/Store';
import {SesionPayload} from '../../src/domain/sesiones/entidades/Sesion';
import {v4 as uuidv4} from 'uuid';
import {Usuario} from '../usuarios/support/Usuarios';
import CrearSesionDTO from "../../src/domain/sesiones/casos-uso/CrearSesion";

function hours(n: number) {
    return n * 60 * 60 * 1000;
}

function toSeconds(millis: number) {
    return millis / 1000;
}

export function generateToken(email: string): string {
    const usuario: Usuario = Store.getInstance().get(email);

    const payload = new SesionPayload(
        usuario.id,
        usuario.email,
        usuario.role,
        Math.trunc(toSeconds(Date.now() + hours(24)))
    );

    return new JWTTokenBuilder(<string>process.env.SECRET_KEY).buildToken(payload);
}

function userCreationHandler() {
    // wildcard * necesario porque el endpoint /v1/usuarios esta cubierto por un proxy
    // que msw por alguna razón no llega a capturar. Lo que hacemos es capturar
    // la llamada a la aplicación en lugar al destino del proxy
    return rest.post(`${process.env['USERS_SERVICE_URL']}/v1/usuarios`, (req, res, ctx) => {
        const usuario: Usuario = <Usuario>req.body;

        usuario.id = uuidv4()

        Store.getInstance().set(usuario.email, usuario);

        return res(
            ctx.status(200),
            ctx.json(usuario)
        );
    })
}

function sesionCreationHandler() {
    return rest.post(`${process.env['USERS_SERVICE_URL']}/v1/sesiones`, (req, res, ctx) => {
        const requestBody: CrearSesionDTO = <CrearSesionDTO>req.body;

        if (!requestBody.email || !requestBody.password) {
            return res(
                ctx.status(400),
                ctx.json({
                    message: 'User or password missing'
                })
            )
        }

        if (!Store.getInstance().has(requestBody.email)) {
            return res(
                ctx.status(401),
                ctx.json({
                    message: 'User not recognized'
                })
            )
        }

        const usuario: Usuario = Store.getInstance().get(requestBody.email);

        if (usuario.password != requestBody.password) {
            return res(
                ctx.status(401),
                ctx.json({
                    message: 'User not recognized'
                })
            )
        }

        const mockedToken: string = generateToken(usuario.email)

        return res(
            ctx.status(200),
            ctx.json({
                token: mockedToken
            })
        );
    })
}

export function buildHandlers() {
    return [
        sesionCreationHandler(),
        userCreationHandler()
    ]
}

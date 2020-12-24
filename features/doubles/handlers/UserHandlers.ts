import {Usuario} from "../../usuarios/support/Usuarios";
import Store from "../../util/Store";
import {SesionPayload} from "../../../src/domain/sesiones/entidades/Sesion";
import JWTTokenBuilder from "../../../src/infra/servicios/JWTTokenBuilder";
import {rest} from "msw";
import {v4 as uuidv4} from "uuid";

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

export default function userHandlers() {
    return [
        rest.post(`${process.env['USERS_SERVICE_URL']}/v1/usuarios`, (req, res, ctx) => {

            const usuario: Usuario = <Usuario>req.body;

            usuario.id = uuidv4()

            Store.getInstance().set(usuario.email, usuario);

            return res(
                ctx.status(200),
                ctx.json(usuario)
            );
        })
    ]
}

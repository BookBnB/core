import {rest} from "msw";
import CrearSesionDTO from "../../../src/domain/sesiones/casos-uso/CrearSesion";
import Store from "../../util/Store";
import {Usuario} from "../../usuarios/support/Usuarios";
import {generateToken} from "./UserHandlers";

export default function sesionCreationHandler() {
    return [
        rest.post(`${process.env['USERS_SERVICE_URL']}/v1/sesiones`, (req, res, ctx) => {
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
    ]
}

import { rest } from 'msw';
import JWTTokenBuilder from '../../src/infra/servicios/JWTTokenBuilder';
import Store from '../util/Store';

interface User {
    email: string,
    password: string,
    name: string,
    role: string
}

interface SessionCreation {
    email: string,
    password: string
}

function userCreationHandler() {
    // wildcard * necesario porque el endpoint /v1/users esta cubierto por un proxy
    // que msw por alguna razón no llega a capturar. Lo que hacemos es capturar
    // la llamada a la aplicación en lugar al destino del proxy
    return rest.post(`*/v1/users`, (req, res, ctx) => {
        const user: User = <User>req.body;

        Store.getInstance().set(user.email, user);

        return res(
            ctx.status(200),
            ctx.json(user)
        );
    })
}

function sessionCreationHandler() {
    return rest.post(`${process.env.USERS_SERVICE_URL}/v1/sessions`, (req, res, ctx) => {
        const requestBody: SessionCreation = <SessionCreation>req.body;

        if (!Store.getInstance().has(requestBody.email)) {
            return res(
                ctx.status(401),
                ctx.json({
                    error: 'User not recognized'
                })
            )
        }

        const user: User = Store.getInstance().get(requestBody.email);

        if (user.password != requestBody.password) {
            return res(
                ctx.status(401),
                ctx.json({
                    error: 'User not recognized'
                })
            )
        }

        const mockedToken: string = new JWTTokenBuilder(<string>process.env.SECRET_KEY).buildToken({
            email: user.email,
            role: user.role,
            exp: +new Date()
        });

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
        sessionCreationHandler(),
        userCreationHandler()
    ]
}

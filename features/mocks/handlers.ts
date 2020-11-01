import { rest } from 'msw';
import JWTTokenBuilder from '../../src/infra/servicios/JWTTokenBuilder';

export function buildHandlers() {
    console.log(`${process.env.USERS_SERVICE_URL}/v1/session`)
    return [
        rest.post(`${process.env.USERS_SERVICE_URL}/v1/session`, (req, res, ctx) => {
            const mockedToken: string = new JWTTokenBuilder(<string>process.env.SECRET_KEY).buildToken({
                email: (<any>req.body).email,
                role: 'host',
                exp: +new Date()
            });

            return res(
                ctx.status(200),
                ctx.json({
                    token: mockedToken
                })
            );
        })
    ]
}

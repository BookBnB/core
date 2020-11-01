import { rest } from 'msw';
import JWTTokenBuilder from '../../src/infra/servicios/JWTTokenBuilder';

export const handlers = [
    rest.post('*heroku*/v1/session', (req, res, ctx) => {
        const mockedToken: string = new JWTTokenBuilder('testkey').buildToken({
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
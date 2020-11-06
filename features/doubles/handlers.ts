import {rest} from 'msw';
import JWTTokenBuilder from '../../src/infra/servicios/JWTTokenBuilder';
import CrearSesionDTO from "../../src/domain/sesiones/dtos/CrearSesionDTO";
import Store from '../util/Store';

interface Usuario {
    email: string,
    password: string,
    name: string,
    role: string
}

function hours(n: number) {
    return n * 60 * 60 * 1000;
}

function toSeconds(millis: number) {
    return millis / 1000;
}

function userCreationHandler() {
    // wildcard * necesario porque el endpoint /v1/users esta cubierto por un proxy
    // que msw por alguna razón no llega a capturar. Lo que hacemos es capturar
    // la llamada a la aplicación en lugar al destino del proxy
    return rest.post(`*/v1/users`, (req, res, ctx) => {
        const usuario: Usuario = <Usuario>req.body;

        Store.getInstance().set(usuario.email, usuario);

        return res(
            ctx.status(200),
            ctx.json(usuario)
        );
    })
}

function sesionCreationHandler() {
    return rest.post(`${process.env.USERS_SERVICE_URL}/v1/sessions`, (req, res, ctx) => {
        const requestBody: CrearSesionDTO = <CrearSesionDTO>req.body;

        if (!Store.getInstance().has(requestBody.email)) {
            return res(
                ctx.status(401),
                ctx.json({
                    error: 'User not recognized'
                })
            )
        }

        const usuario: Usuario = Store.getInstance().get(requestBody.email);

        if (usuario.password != requestBody.password) {
            return res(
                ctx.status(401),
                ctx.json({
                    error: 'User not recognized'
                })
            )
        }

        const mockedToken: string = new JWTTokenBuilder(<string>process.env.SECRET_KEY).buildToken({
            id: usuario.email,
            role: usuario.role,
            exp: Math.trunc(toSeconds(Date.now() + hours(24)))
        });

        return res(
            ctx.status(200),
            ctx.json({
                token: mockedToken
            })
        );
    })
}

function buscarDireccionHandler() {
    return rest.post(`*/1/places/query`, (req, res, ctx) => {
        const body = JSON.parse(<string>req.body)
        if (body.query.includes('paseo colon')) {
            return res(
                ctx.status(200),
                ctx.json({
                    hits: [
                        {
                            "country": "Argentina",
                            "city": [
                                "Buenos Aires",
                                "Capital Federal",
                                "CABA"
                            ],
                            "postcode": [
                                "1063",
                                "C1063ADN",
                            ],
                            "country_code": "ar",
                            "locale_names": [
                                "Avenida Paseo Colón 850"
                            ],
                            "_geoloc": {
                                "lat": -34.6092,
                                "lng": -58.3697
                            },
                            "objectID": "100403312_83432703",
                        }
                    ]
                })
            )
        } else if (body.query.includes('una dirección inexistente')) {
            return res(
                ctx.status(200),
                ctx.json({hits: []})
            )
        }
    })
}

export function buildHandlers() {
    return [
        sesionCreationHandler(),
        userCreationHandler(),
        buscarDireccionHandler()
    ]
}

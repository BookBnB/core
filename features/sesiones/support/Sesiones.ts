import chai from "chai";
import chaiHttp from "chai-http";
import {World} from "cucumber";

chai.use(chaiHttp);

export default class Sesiones {
    public static ejemplo(publicacionId: string) {
        return {
            publicacionId: publicacionId,
            fechaInicio: new Date('2020-12-01').toISOString(),
            fechaFin: new Date('2020-12-07').toISOString()
        }
    }

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
}

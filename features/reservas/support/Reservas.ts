import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

export default class Reservas {
    public static ejemplo(publicacionId: string) {
        return {
            publicacionId: publicacionId,
            fechaInicio: new Date('2020-12-01').toISOString(),
            fechaFin: new Date('2020-12-07').toISOString()
        }
    }

    public static async crear(context: any, reserva: any) {
        context.last_response = await chai.request(context.app)
            .post('/v1/reservas')
            .set('authorization', context.tokenSesion)
            .type('json')
            .send(reserva)
    }
}

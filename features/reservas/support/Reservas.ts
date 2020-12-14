import chai from "chai";
import chaiHttp from "chai-http";
import {World} from "cucumber";
import Recurso from "../../util/Recurso";

chai.use(chaiHttp);

export default class Reservas extends Recurso {
    public static ejemplo(publicacionId: string) {
        return {
            publicacionId: publicacionId,
            fechaInicio: new Date('2020-12-01').toISOString(),
            fechaFin: new Date('2020-12-07').toISOString()
        }
    }

    public static async crear(context: World, reserva: any) {
        context.last_response = await chai.request(context.app)
            .post('/v1/reservas')
            .set('authorization', context.tokenSesion)
            .type('json')
            .send(reserva)
    }

    static async listarPorPublicacion(world: World, publicacionId: string, estado: string | undefined = undefined) {
        world.last_response = await chai.request(world.app)
            .get(`/v1/publicaciones/${publicacionId}/reservas`)
            .query({estado: estado})
            .set('authorization', world.tokenSesion)
    }
}

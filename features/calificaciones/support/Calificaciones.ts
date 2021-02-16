import chai from "chai";
import chaiHttp from "chai-http";
import Recurso from "../../util/Recurso";

chai.use(chaiHttp);

export interface Calificacion {
    puntos: number
    detalle?: string
}

export default class Calificaciones extends Recurso {
    public static async calificarAlojamiento(context: any, publicacionId: string, calificacion: Calificacion) {
        context.last_response = await chai.request(context.app)
            .post(`/v1/publicaciones/${publicacionId}/calificaciones`)
            .set('authorization', this.tokenActual(context))
            .send(calificacion)
    }
}


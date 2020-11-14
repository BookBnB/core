import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

export default class Recurso {

    protected static baseUlr(): string {
        throw Error('baseUrl no implementado')
    }

    protected static async post(context: any, path: string, data: object) {
        context.last_response = await chai.request(context.app)
            .post(`${this.baseUlr()}${path}`)
            .set('authorization', context.tokenSesion)
            .type("json")
            .send(data)
    }
}
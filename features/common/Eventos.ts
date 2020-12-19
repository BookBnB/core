import chai from "chai";
import chaiHttp from "chai-http";
import {World} from "cucumber";

chai.use(chaiHttp);

export default class Eventos {
    static readonly BASE_URL: string = '/v1/eventos'

    protected static baseUlr(): string {
        return this.BASE_URL;
    }

    public static async crear(context: World, evento: any) {
        context.last_response = await chai.request(context.app)
            .post(`${this.baseUlr()}`)
            .type("json")
            .send(evento)
        context.last_evento = context.last_response
    }
}

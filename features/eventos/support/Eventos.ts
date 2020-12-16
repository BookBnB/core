import chai from "chai";
import chaiHttp from "chai-http";
import Recurso from "../../util/Recurso";

chai.use(chaiHttp);

export default class Eventos extends Recurso {
    static readonly BASE_URL: string = '/v1/eventos'

    protected static baseUlr(): string {
        return this.BASE_URL;
    }

    public static async crear(context: any, evento: any) {
        await this.post(context, '/', evento)
        context.last_evento = context.last_response
    }
}

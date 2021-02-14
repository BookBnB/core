import chai from "chai";
import chaiHttp from "chai-http";
import {World} from "cucumber";

chai.use(chaiHttp);

export default class Recurso {

    protected static baseUlr(): string {
        throw Error('baseUrl no implementado')
    }

    protected static tokenActual(context: World): string {
        return context.sesiones.tokenActual() || ''
    }

    protected static async post(context: World, path: string, data: object) {
        context.last_response = await chai.request(context.app)
            .post(`${this.baseUlr()}${path}`)
            .set('authorization', this.tokenActual(context))
            .type("json")
            .send(data)
    }

    protected static async get(context: World, path: string, query: object = {}) {
        context.last_response = await chai.request(context.app)
            .get(`${this.baseUlr()}${path}`)
            .query(query)
            .set('authorization', this.tokenActual(context) || '')
    }

    protected static async put(context: World, path: string, data: object = {}) {
        context.last_response = await chai.request(context.app)
            .put(`${this.baseUlr()}${path}`)
            .set('authorization', this.tokenActual(context))
            .type("json")
            .send(data)
    }

    protected static async delete(context: World, path: string) {
        context.last_response = await chai.request(context.app)
            .delete(`${this.baseUlr()}${path}`)
            .set('authorization', this.tokenActual(context))
            .type("json")
    }
}

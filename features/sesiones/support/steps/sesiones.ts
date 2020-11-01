import {Given, When, Then, TableDefinition } from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import { SessionDTO, SessionPayloadDTO } from "../../../../src/domain/sesiones/dtos/SessionDTO";

chai.use(chaiHttp);
const expect = chai.expect;

Given('que soy un usuario con datos:', async function (dataTable) {
    const data = dataTable.rowsHash();

    this.user = {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        role: data.role
    }
});

When('inicio sesión', async function () {
    this.last_request = await chai.request(this.app)
        .post('/v1/session')
        .type('json')
        .send({
            email: this.user.email,
            password: this.user.password
        })
});

Then('obtengo un token con:', function (dataTable: TableDefinition) {
    const data = dataTable.rowsHash();

    const token: string = this.last_request.body.token;
    const session: SessionDTO = new SessionDTO(token);
    const payload: SessionPayloadDTO = session.getPayload();

    expect(payload).to.have.property('email').to.be.equal(data.email)
    expect(payload).to.have.property('role').to.be.equal(data.rol)
    expect(payload).to.have.property('exp')
});

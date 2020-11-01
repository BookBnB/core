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

    this.lastRequest = await chai.request(this.app)
        .post('/v1/users')
        .type('json')
        .send(this.user);
});

When('inicio sesión con contraseña {string}', async function (password) {
    this.lastRequest = await chai.request(this.app)
        .post('/v1/session')
        .type('json')
        .send({
            email: this.user.email,
            password: password
        })
});

When('inicio sesión con email {string} y contraseña {string}', async function (email, password) {
    this.lastRequest = await chai.request(this.app)
        .post('/v1/session')
        .type('json')
        .send({
            email: email,
            password: password
        })
});

Then('obtengo un token con:', function (dataTable: TableDefinition) {
    const data = dataTable.rowsHash();

    const token: string = this.lastRequest.body.token;
    const session: SessionDTO = new SessionDTO(token);
    const payload: SessionPayloadDTO = session.getPayload();

    expect(payload).to.have.property('email').to.be.equal(data.email)
    expect(payload).to.have.property('role').to.be.equal(data.rol)
    expect(payload).to.have.property('exp')
});

Then('obtengo un error {int} con mensaje {string}', function (code, message) {
    expect(this.lastRequest).to.be.json
    expect(this.lastRequest.body.message).to.be.equal(message)
    expect(this.lastRequest).to.have.status(code)
});
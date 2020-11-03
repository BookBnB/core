import {Given, When, Then, TableDefinition } from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import { Session, SessionPayload } from "../../../../src/domain/sesiones/entidades/Session";
import JWTTokenBuilder from "../../../../src/infra/servicios/JWTTokenBuilder";

chai.use(chaiHttp);
const expect = chai.expect;

Given('que soy un usuario con datos:', async function (dataTable) {
    const data = dataTable.rowsHash();

    this.currentUser = {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        role: data.role
    }

    this.last_response = await chai.request(this.app)
        .post('/v1/users')
        .type('json')
        .send(this.currentUser);
});

When('inicio sesión con email {string} y contraseña {string}', async function (email, password) {
    this.last_response = await chai.request(this.app)
        .post('/v1/sessions')
        .type('json')
        .send({
            email: email,
            password: password
        })
});

Given('inicié mi sesión correctamente', async function () {
    this.last_response = await chai.request(this.app)
        .post('/v1/sessions')
        .type('json')
        .send({
            email: this.currentUser.email,
            password: this.currentUser.password
        });

    expect(this.last_response).to.have.status(200)

    this.sessionToken = this.last_response.body.token;
});

Given('mi sesión expiró', function () {
    const session: Session = new Session(this.sessionToken);
    const payload: SessionPayload = session.getPayload();

    const newPayload: SessionPayload = new SessionPayload(
        payload.email,
        payload.role,
        Date.now()
    )

    this.sessionToken = new JWTTokenBuilder(<string>process.env.SECRET_KEY).buildToken(newPayload.toPlainObject());
});

Then('obtengo un token con:', function (dataTable: TableDefinition) {
    const data = dataTable.rowsHash();

    const token: string = this.last_response.body.token;
    const session: Session = new Session(token);
    const payload: SessionPayload = session.getPayload();

    expect(payload).to.have.property('email').to.be.equal(data.email)
    expect(payload).to.have.property('role').to.be.equal(data.rol)
    expect(payload).to.have.property('exp')
});

Then('obtengo un error {int} con mensaje {string}', function (code, message) {
    expect(this.last_response).to.be.json
    expect(this.last_response).to.have.status(code)
    expect(this.last_response.body.message).to.be.equal(message)
});

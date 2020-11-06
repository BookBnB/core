import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import {Sesion, SesionPayload} from "../../../../src/domain/sesiones/entidades/Sesion";
import JWTTokenBuilder from "../../../../src/infra/servicios/JWTTokenBuilder";

chai.use(chaiHttp);
const expect = chai.expect;

export async function crearUsuario(this: any, data: { nombre: string, email: string, password: string, role: string }) {
    this.usuarioActual = {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        role: data.role
    }

    this.last_response = await chai.request(this.app)
        .post('/v1/users')
        .type('json')
        .send(this.usuarioActual);
}

export async function iniciarSesion(this: any, email: string, password: string) {
    this.last_response = await chai.request(this.app)
        .post('/v1/sesiones')
        .type('json')
        .send({
            email: email,
            password: password
        })
}

Given('que soy un usuario con datos:', async function (dataTable) {
    await crearUsuario.bind(this)(dataTable.rowsHash())
});

When('inicio sesión con email {string} y contraseña {string}', iniciarSesion);

Given('que inicié mi sesión correctamente', async function () {
    this.last_response = await chai.request(this.app)
        .post('/v1/sesiones')
        .type('json')
        .send({
            email: this.usuarioActual.email,
            password: this.usuarioActual.password
        });

    expect(this.last_response).to.have.status(200)

    this.tokenSesion = this.last_response.body.token;
});

Given('que mi sesión expiró', function () {
    this.reloj.setAhora(Date.now() + 24 * 60 * 60 * 1000 + 1)
});

Given('que mi sesión es inválida', function () {
    const builder: JWTTokenBuilder = new JWTTokenBuilder('fake_secret');
    const sesion: Sesion = new Sesion(this.tokenSesion).getNewToken(builder);
    this.tokenSesion = sesion.token;
});

Then('obtengo un token con:', function (dataTable: TableDefinition) {
    const data = dataTable.rowsHash();

    const token: string = this.last_response.body.token;
    const sesion: Sesion = new Sesion(token);
    const payload: SesionPayload = sesion.getPayload();

    expect(payload).to.have.property('id').to.be.equal(data.id)
    expect(payload).to.have.property('role').to.be.equal(data.rol)
    expect(payload).to.have.property('exp')
});

Then('obtengo un error {int} con mensaje {string}', function (code, message) {
    expect(this.last_response).to.be.json
    expect(this.last_response).to.have.status(code)
    expect(this.last_response.body.message).to.be.equal(message)
});

import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import {Sesion, SesionPayload} from "../../../../src/domain/sesiones/entidades/Sesion";
import JWTTokenBuilder from "../../../../src/infra/servicios/JWTTokenBuilder";

chai.use(chaiHttp);
const expect = chai.expect;

const roles = new Map([
    ["anfitrión", "host"],
    ["huesped", "guest"]
])

export async function crearUsuario(this: any, usuario: any) {
    usuario.role = roles.get(usuario.role) || usuario.role
    this.last_response = await chai.request(this.app)
        .post('/v1/usuarios')
        .type('json')
        .send(usuario);

    usuario.id = this.last_response.body.id;

    this.gestorDeSesiones.registrarUsuario(usuario);

    this.usuarioActual = usuario;
}

export async function iniciarSesion(this: any, email: string, password: string) {
    this.last_response = await chai.request(this.app)
        .post('/v1/sesiones')
        .type('json')
        .send({
            email: email,
            password: password
        });

    const token: string = this.last_response.body.token;

    this.gestorDeSesiones.registrarSesion(email, token)

    this.tokenSesion = token;
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

    expect(payload).to.have.property('id')
    expect(payload).to.have.property('email').to.be.equal(data.email)
    expect(payload).to.have.property('role').to.be.equal(data.role)
    expect(payload).to.have.property('exp')
});

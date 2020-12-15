import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import {Sesion, SesionPayload} from "../../../../src/domain/sesiones/entidades/Sesion";
import JWTTokenBuilder from "../../../../src/infra/servicios/JWTTokenBuilder";
import Usuarios from "../../../usuarios/support/Usuarios";
import Sesiones from "../Sesiones";

chai.use(chaiHttp);
const expect = chai.expect;


Given('que estoy registrado con:', async function (dataTable) {
    await Usuarios.crear(this, dataTable.rowsHash())
});

When('inicio sesión con email {string} y contraseña {string}', async function (email: string, password: string) {
    await Sesiones.crear(this, email, password)
});

When('inicio sesión sin contraseña', async function () {
    await Sesiones.crear(this, 'test@test.test', null)
});

When('inicio sesión sin email', async function () {
    await Sesiones.crear(this, null, 'password')
});

Given('que inicié mi sesión correctamente', async function () {
    await Sesiones.crear(this, this.last_response.body.email, this.last_response.body.password)
    this.sesiones.setTokenActual(this.last_response.body.token)

    expect(this.last_response).to.have.status(200)
});

Given('que mi sesión expiró', function () {
    this.reloj.setAhora(Date.now() + 24 * 60 * 60 * 1000 + 1)
});

Given('que mi cambio mi token por uno inválido', function () {
    const tokenActual = this.sesiones.tokenActual()

    const builder: JWTTokenBuilder = new JWTTokenBuilder('fake_secret');
    const sesion: Sesion = new Sesion(tokenActual).getNewToken(builder);

    this.sesiones.setTokenActual(sesion.token)
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

When('inicio sesión correctamente con un proovedor de identidad federada', async function () {
    Sesiones.mockTokenValido('john@doe.com')
    await Sesiones.crearConGoogle(this)
});

When('inicio sesión con un token inválido de proovedor de identidad federada', async function () {
    Sesiones.mockTokenInvalido()
    await Sesiones.crearConGoogle(this)
});

When('inicio sesión con un token de proovedor de identidad federada cuyo usuario no está registrado', async function () {
    Sesiones.mockTokenDeUsuarioNoRegistrado()
    await Sesiones.crearConGoogle(this)
});

import chai from "chai";
import { Then, When } from "cucumber";
import sinonChai from "sinon-chai";
import Usuarios from "../Usuarios";

chai.use(sinonChai)
const expect = chai.expect

When('guardo mi dispositivo con token {string}', async function (token: string) {
    await Usuarios.guardarDispositivo(this, this.sesiones.usuarioActual().id, token)
});

Then('recibo una confirmación con mi dispositivo creado con token {string}', function (token: string) {
    expect(this.last_response).to.be.json
    expect(this.last_response).to.have.status(200)
    expect(this.last_response.body.token).to.eql(token)
});

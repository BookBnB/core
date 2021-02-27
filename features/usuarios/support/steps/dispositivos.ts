import chai from "chai";
import { Then, When } from "cucumber";
import sinonChai from "sinon-chai";
import Usuarios from "../Usuarios";

chai.use(sinonChai)
const expect = chai.expect

When('guardo mi dispositivo', async function () {
    await Usuarios.guardarDispositivo(this, this.sesiones.usuarioActual().id, 'un_token')
});

Then('recibo una confirmación con mi dispositivo creado', function () {
    expect(this.last_response).to.be.json
    expect(this.last_response).to.have.status(200)
    expect(this.last_response.body.token).to.eql('un_token')
});

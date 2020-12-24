import chai from "chai";
import { Then, When } from "cucumber";
import sinonChai from "sinon-chai";
import Usuarios from "../Usuarios";

chai.use(sinonChai)
const expect = chai.expect

When('se registra un {string} con email {string}', async function (rol, email) {
    await Usuarios.crear(this, {...Usuarios.ejemplo(), email, role: rol})
});

Then('veo que se creo un usuario email {string}', function (email) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response.body.email).to.eql(email)
});

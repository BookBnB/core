import chai from "chai";
import { Then, When } from "cucumber";
import sinonChai from "sinon-chai";
import Usuarios from "../Usuarios";

chai.use(sinonChai)
const expect = chai.expect

When('se registra un {string} con email {string}', async function (rol, email) {
    await Usuarios.crear(this, {...Usuarios.ejemplo(), email, role: rol})
});

When('se registra un {string} con token de google', async function (rol) {
    await Usuarios.crearConGoogle(this, rol, 'un_token')
});

Then('recibo un pedido de creación de billetera', function () {
    expect(this.servicioPagos.crearBilletera).to.have.been.calledWithMatch({
        id: this.last_usuario.body.id
    })
});

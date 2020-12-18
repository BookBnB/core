import chai from "chai";
import { Given, TableDefinition, Then, When } from "cucumber";
import sinonChai from "sinon-chai";
import { validarObjeto } from "../../../util/Validacion";
import Usuarios from "../Usuarios";

chai.use(sinonChai)
const expect = chai.expect

Given('que no existen usuario', function () {
});

When('creo un {string} con email {string}', async function (rol, email) {
    await Usuarios.crear(this, {...Usuarios.ejemplo(), email, role: rol})
});

Then('veo un usuario con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarObjeto(this.last_response.body, dataTable)
});

Then('se creó la billetera correspondiente', function () {
    expect(this.mockServicioPagos.crearBilletera).to.have.been.calledWithMatch({
        id: this.last_response.body.id
    }).and.to.not.have.thrown()
});

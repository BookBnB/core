import chai from "chai"
import chaiHttp from "chai-http"
import { When, Then, TableDefinition } from 'cucumber';
import { validarObjeto } from "../../../util/Validacion";

chai.use(chaiHttp);
const expect = chai.expect;

When('intento hacer una reserva del {string} al {string}', async function (fechaInicioStr, fechaFinStr) {
    const fechaInicio: Date = new Date(fechaInicioStr);
    const fechaFin: Date = new Date(fechaFinStr);

    const reserva = {
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        publicacionId: this.last_response.body.id
    }

    this.last_response = await chai.request(this.app)
        .post('/v1/reservas')
        .set('authorization', this.tokenSesion)
        .type('json')
        .send(reserva)
});

Then('veo una nueva reserva con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarObjeto.bind(this)(dataTable)
});

Then('veo que está reservada a mí nombre', function () {
    expect(this.last_response.body).to.have.property('huespedEmail', this.usuarioActual.email)
});

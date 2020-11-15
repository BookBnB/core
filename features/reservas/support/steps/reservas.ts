import chai from "chai"
import chaiHttp from "chai-http"
import { When, Then, TableDefinition } from 'cucumber';
import _ from "lodash";
import { validarObjeto } from "../../../util/Validacion";
import Reservas from "../Reservas";

chai.use(chaiHttp);
const expect = chai.expect;

When('intento hacer una reserva del {string} al {string} con precio {int}', async function (fechaInicioStr, fechaFinStr, precio) {
    const fechaInicio: Date = new Date(fechaInicioStr);
    const fechaFin: Date = new Date(fechaFinStr);

    const reserva = {
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        publicacionId: this.last_response.body.id,
        precioPorNoche: precio
    }

    await Reservas.crear(this, reserva);
});

When('intento hacer una reserva sin {string}', async function (campo) {
    const publicacionId = this.last_response.body.id;
    const reserva = Reservas.ejemplo(publicacionId);

    _.unset(reserva, campo);

    await Reservas.crear(this, reserva);
});

When('intento hacer una reserva con {string} vacío', async function (campo) {
    const publicacionId = this.last_response.body.id;
    const reserva = Reservas.ejemplo(publicacionId);

    _.set(reserva, campo, '');

    await Reservas.crear(this, reserva);
});

When('intento hacer una reserva con {string} {string}', async function (campo, valor) {
    const publicacionId = this.last_response.body.id;
    const reserva = Reservas.ejemplo(publicacionId);

    _.set(reserva, campo, valor);

    await Reservas.crear(this, reserva);
});

Then('veo una nueva reserva con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarObjeto.bind(this)(dataTable)
});

Then('veo que está reservada a mí nombre', function () {
    expect(this.last_response.body).to.have.property('huespedId', this.usuarioActual.id)
});

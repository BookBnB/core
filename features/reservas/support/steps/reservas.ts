import chai from "chai"
import chaiHttp from "chai-http"
import {When, Then, Given, TableDefinition} from 'cucumber';
import _ from "lodash";
import {validarConjunto, validarObjeto} from "../../../util/Validacion";
import Reservas from "../Reservas";
import Publicaciones from "../../../publicaciones/support/Publicaciones";
import {crearUsuarioConRol} from "../../../publicaciones/support/steps/publicaciones";

chai.use(chaiHttp);
const expect = chai.expect;

When('intento hacer una reserva del {string} al {string} en la publicación con título {string}', async function (fechaInicio, fechaFin, titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo, `No se encuentra la publicación con título ${titulo}`)
    const reserva = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        publicacionId: this.last_publicacion.body.id,
    }

    await Reservas.crear(this, reserva);
});

When('intento hacer una reserva sin {string}', async function (campo) {
    const publicacionId = this.last_publicacion.body.id;
    const reserva = Reservas.ejemplo(publicacionId);

    _.unset(reserva, campo);

    await Reservas.crear(this, reserva);
});

When('intento hacer una reserva con {string} vacío', async function (campo) {
    const publicacionId = this.last_publicacion.body.id;
    const reserva = Reservas.ejemplo(publicacionId);

    _.set(reserva, campo, '');

    await Reservas.crear(this, reserva);
});

When('intento hacer una reserva con {string} {string}', async function (campo, valor) {
    const publicacionId = this.last_publicacion.body.id;
    const reserva = Reservas.ejemplo(publicacionId);

    _.set(reserva, campo, valor);

    await Reservas.crear(this, reserva);
});

Then('veo una nueva reserva con:', async function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    const reserva = this.last_response.body
    await Publicaciones.obtener(this, this.last_response.body.publicacionId)
    this.last_response.body = {...reserva, publicacion: this.last_response.body}
    validarObjeto.bind(this)(dataTable)
});

Then('veo que está reservada a mí nombre', function () {
    expect(this.last_response.body).to.have.property('huespedId', this.usuarioActual.id)
});

Given('que un huesped tiene una reserva en la publicación con título {string} con:', async function (titulo, dataTable: TableDefinition) {
    await crearUsuarioConRol.bind(this)("huesped");

    expect(this.last_publicacion.body.titulo).to.eq(titulo, `No se encuentra la publicación con título ${titulo}`)
    const reserva = dataTable.rowsHash()
    reserva.publicacionId = this.last_publicacion.body.id
    await Reservas.crear(this, reserva);
});

When('listo las reservas de la publicación con título {string}', async function (titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo, `No se encuentra la publicación con título ${titulo}`)

    await Reservas.listarPorPublicacion(this, this.last_publicacion.body.id);
});

Then('no obtengo reservas', function () {
    expect(this.last_response.body).to.eql([])
});

When('listo las reservas {string} de la publicación con título {string}', async function (estado, titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo, `No se encuentra la publicación con título ${titulo}`)

    const estados = new Map([
        ["pendientes", "pendiente"],
        ["aceptadas", "aceptada"],
        ["rechazadas", "rechazada"],
        ["canceladas", "cancelada"]
    ])
    await Reservas.listarPorPublicacion(this, this.last_publicacion.body.id, estados.get(estado));
});

Then('veo las reservas:', function (dataTable: TableDefinition) {
    validarConjunto.bind(this)(dataTable)
});

When('listo las reservas de una publicación que no existe', async function () {
    await Reservas.listarPorPublicacion(this, '3ff413a1-addd-4e9c-97a1-ebd191216393');
});

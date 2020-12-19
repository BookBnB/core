import chai from "chai";
import chaiHttp from "chai-http";
import { Given, TableDefinition, Then, When } from 'cucumber';
import _ from "lodash";
import sinonChai from "sinon-chai"
import { TipoEvento } from "../../../../src/application/EventoController";
import Eventos from "../../../common/Eventos";
import Publicaciones from "../../../publicaciones/support/Publicaciones";
import { crearPublicacion } from "../../../publicaciones/support/steps/publicaciones";
import Usuarios from "../../../usuarios/support/Usuarios";
import { validarConjunto, validarObjeto } from "../../../util/Validacion";
import Reservas from "../Reservas";

chai.use(chaiHttp);
chai.use(sinonChai)
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
    validarObjeto(this.last_response.body, dataTable)
});

Then('veo que está reservada a mí nombre', function () {
    expect(this.last_response.body).to.have.property('huespedId', this.sesiones.usuarioActual().id)
});

Given('que el huesped con email {string} tiene una reserva en la publicación con título {string} con:', async function (email, titulo, dataTable) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo, `No se encuentra la publicación con título ${titulo}`)

    await this.sesiones.ejecutarBajoSesion(async () => {
        const reserva = dataTable.rowsHash()
        reserva.publicacionId = this.last_publicacion.body.id
        await Reservas.crear(this, reserva);
        this.reservas[email] = this.last_reserva.body
    }, email)
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
        ["pendientes de creacion", "pendiente de creacion"],
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

When('listo las reservas de una publicación que no es mía', async function () {
    await Usuarios.crearActual(this, 'anfitrión', 'uno@bookbnb.com')
    await Publicaciones.crear(this, Publicaciones.ejemplo())
    const publicacionId = this.last_publicacion.body.id
    await Usuarios.crearActual(this, 'anfitrión', 'otro@bookbnb.com')
    await Reservas.listarPorPublicacion(this, publicacionId)
});

Given('que realicé una publicación con:', async function (dataTable) {
    await crearPublicacion.bind(this)(dataTable)
});

Then('ingreso a la reserva', async function () {
    await Reservas.obtener(this, this.last_reserva.body.id)
});

Then('veo una reserva con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
    validarObjeto(this.last_response.body, dataTable)
});

When('se notifica un evento para la reserva creada', async function () {
    const evento = {
        tipo: TipoEvento.NUEVA_RESERVA,
        payload: {
            reservaId: this.last_reserva.body.id
        }
    }

    await Eventos.notificar(this, evento)

    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
});

When('se notifica un evento de aprobacion para la reserva', async function () {
    const evento = {
        tipo: TipoEvento.RESERVA_ACEPTADA,
        payload: {
            reservaId: this.last_reserva.body.id
        }
    }

    await Eventos.notificar(this, evento)

    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
});

When('apruebo la reserva del usuario {string}', async function (email) {
    const reserva = this.reservas[email]
    await Reservas.aprobar(this, reserva.id)
});

Then('se desencadena el proceso de aceptación del usuario {string}', async function (email) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json

    const reserva = this.reservas[email]
    expect(this.mockServicioPagos.aceptarReserva).to.have.been.calledWithMatch({
        id: reserva.id
    })
});

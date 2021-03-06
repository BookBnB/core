import { DIContainer } from "@wessberg/di";
import chai from "chai";
import chaiHttp from "chai-http";
import chaiSubset from "chai-subset";
import { Given, TableDefinition, Then, When } from "cucumber";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import Publicacion, { EstadoPublicacion } from "../../../../src/domain/publicaciones/entidades/Publicacion";
import IPublicacionRepositorio from "../../../../src/domain/publicaciones/repositorios/PublicacionRepositorio";
import Eventos from "../../../common/Eventos";
import Sesiones from "../../../sesiones/support/Sesiones";
import Usuarios from "../../../usuarios/support/Usuarios";
import GestorDeSesiones from "../../../util/GestorDeSesiones";
import { validarConjunto } from "../../../util/Validacion";
import Publicaciones from "../Publicaciones";


chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;

export async function crearPublicacion(this: any, dataTable?: TableDefinition) {
    const publicacion: any = Publicaciones.ejemplo()

    if (dataTable) {
        dataTable.raw().forEach(([clave, valor]) => {
            _.set(publicacion, clave, valor)
        })
    }

    publicacion.precioPorNoche = parseFloat(publicacion.precioPorNoche)
    publicacion.cantidadDeHuespedes = parseFloat(publicacion.cantidadDeHuespedes)
    publicacion.direccion.coordenadas.latitud = parseFloat(publicacion.direccion.coordenadas.latitud)
    publicacion.direccion.coordenadas.longitud = parseFloat(publicacion.direccion.coordenadas.longitud)

    await Publicaciones.crear(this, publicacion)
}

export async function crearPublicacionConEstado(this: any, estado: string, email: string, publicacion?: TableDefinition) {
    await Usuarios.crear(this, {...Usuarios.ejemplo(), role: 'anfitrión', email})
    await Sesiones.crear(this, this.last_response.body.email, this.last_response.body.password)

    await this.sesiones.ejecutarBajoSesion(async () => {
        await crearPublicacion.bind(this)(publicacion)
    }, email);
    await Eventos.registarEstadoPublicacion(this, estado, this.last_response.body.id)
}

Given(/^que existe una publicación (:?"([^"]*)" )?con:$/, async function (estado: string, publicacion: TableDefinition) {
    await crearPublicacionConEstado.bind(this)(estado || 'creada', 'anfitrion@bookbnb.com', publicacion)
});

Given('que el anfitrión {string} tiene una publicación creada el {string}', async function (emailAnfitrion: string, fecha: string) {
    await this.sesiones.ejecutarBajoSesion(async () => {
        await crearPublicacion.bind(this)()

        const id = this.last_response.body.id
        const repo = await (<DIContainer>this.container).get<IPublicacionRepositorio>()
        let pub = await repo.obtener(id)
        pub.fechaCreacion = new Date(fecha)
        await repo.guardar(pub)
    }, emailAnfitrion)
});

Given('que el anfitrión {string} tiene una publicación {string}', async function (email: string, estadoPublicacion: string) {
    await crearPublicacionConEstado.bind(this)(estadoPublicacion, email)
});

Given('que el anfitrión con email {string} tiene una publicación {string} con:', async function (email: string, estadoPublicacion: string, publicacion: TableDefinition) {
    await crearPublicacionConEstado.bind(this)(estadoPublicacion, email, publicacion)
});

When('el anfitrión con email {string} realiza una publicación con:', async function (email, publicacion) {
    await crearPublicacionConEstado.bind(this)("pendiente", email, publicacion)
});

When(/^(?:notifico|se notifica) que la publicación con título "([^"]*)" fue registrada con éxito$/, async function (titulo) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await Eventos.publicacionCreada(this, this.last_publicacion.body.id)
});

When(/^(?:notifico|se notifica|que se notifica) que la publicación con título "([^"]*)" no pudo registrarse$/, async function (titulo) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await Eventos.publicacionCreacionFallida(this, this.last_publicacion.body.id)
});

When('creo una publicación con:', crearPublicacion)

When('ingreso a la publicación con título {string}', async function (titulo: string) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)
    await Publicaciones.obtener(this, this.last_publicacion.body.id)
});

When('creo una publicación sin {string}', async function (campo: string) {
    const publicacion = Publicaciones.ejemplo()
    _.unset(publicacion, campo)
    await Publicaciones.crear(this, publicacion)
});

When('creo una publicación con el {string} vacío', async function (campo: string) {
    const publicacion = Publicaciones.ejemplo()
    _.set(publicacion, campo, "")
    await Publicaciones.crear(this, publicacion)
});

When('listo las publicaciones', async function () {
    await Publicaciones.listar(this)
});

When('busco las primeras {int} publicaciones en un radio de {int} metros a {float}, {float}', async function (cantidad: number, radio: number, latitud: number, longitud: number) {
    await Publicaciones.listar(this, {cantidad, latitud, longitud, radio})
});

When(/^busco las primeras (\d+) publicaciones(:? "([^"]*)")?$/, async function (cantidad, estado) {
    const estadoCorrecto = new Map([
        ['pendientes', EstadoPublicacion.PENDIENTE_DE_CREACION],
        ['creadas', EstadoPublicacion.CREADA],
        ['rechazadas', EstadoPublicacion.RECHAZADA],
    ]).get(estado)

    await Publicaciones.listar(this, {cantidad, estado: estadoCorrecto as undefined})
});

When(/^busco las primeras (\d+) publicaciones(:? "([^"]*)"), incluyendo bloqueadas?$/, async function (cantidad, estado) {
    const estadoCorrecto = new Map([
        ['pendientes', EstadoPublicacion.PENDIENTE_DE_CREACION],
        ['creadas', EstadoPublicacion.CREADA],
        ['rechazadas', EstadoPublicacion.RECHAZADA],
    ]).get(estado)

    await Publicaciones.listar(this, {
        cantidad,
        estado: estadoCorrecto as undefined,
        incluirBloqueadas: true
    })
});

When('busco las primeras {int} publicaciones de tipo {string}', async function (cantidad, tipoDeAlojamiento) {
    await Publicaciones.listar(this, {cantidad, tipoDeAlojamiento})
});

When('busco las primeras {int} publicaciones con capacidad para al menos {int} huéspedes', async function (cantidadPublicaciones, cantidadDeHuespedes) {
    await Publicaciones.listar(this, {cantidad: cantidadPublicaciones, cantidadDeHuespedes})
});

When('busco las primeras {int} publicaciones con {float} como precio mínimo', async function (cantidad, precioPorNocheMinimo) {
    await Publicaciones.listar(this, {cantidad, precioPorNocheMinimo})
});

When('busco las primeras {int} publicaciones con {float} como precio máximo', async function (cantidad, precioPorNocheMaximo) {
    await Publicaciones.listar(this, {cantidad, precioPorNocheMaximo})
});

When('busco las primeras {int} publicaciones con precio entre {float} y {float}', async function (cantidad, precioPorNocheMinimo, precioPorNocheMaximo) {
    await Publicaciones.listar(this, {cantidad, precioPorNocheMinimo, precioPorNocheMaximo})
});

When('busco las primeras {int} publicaciones entre el {string} y el {string}', async function (cantidad, fechaInicio, fechaFin) {
    await Publicaciones.listar(this, {cantidad, fechaInicio, fechaFin})
});

Then('veo las publicaciones:', function (dataTable: TableDefinition) {
    validarConjunto.bind(this)(dataTable)
});

When('ingreso a la publicación con id {string}', async function (id: string) {
    await Publicaciones.obtener(this, id)
});

When('listo mis publicaciones', async function () {
    await Usuarios.listarPublicaciones(this, this.sesiones.usuarioActual().id);
});

When('listo las publicaciones del anfitrion {string}', async function (email) {
    const usuario = this.sesiones.obtenerUsuario(email)

    const id = usuario ? usuario.id : uuidv4()

    await Usuarios.listarPublicaciones(this, id)
});

When('listo las publicaciones del anfitrion de id {string}', async function (id) {
    await Usuarios.listarPublicaciones(this, id);
});

When('bloqueo la publicación', async function () {
    await Publicaciones.bloquear(this, this.last_publicacion.body.id)
});

When('desbloqueo la publicación', async function () {
    await Publicaciones.desbloquear(this, this.last_publicacion.body.id)
});

When('que {string} bloquea la publicación', async function (email) {
    await this.sesiones.ejecutarBajoSesion(async () => {
        await Publicaciones.bloquear(this, this.last_publicacion.body.id)
    }, email)
});

When('bloqueo la publicación de id {string}', async function (id) {
    await Publicaciones.bloquear(this, id)
});

Then('veo que la publicación está bloqueada', function () {
    expect(this.last_response.body.bloqueada).to.be.true
})

Then('veo que la publicación no está bloqueada', function () {
    expect(this.last_response.body.bloqueada).to.be.false
})

Then('veo que está publicada a mí nombre', function () {
    expect(this.last_response.body).to.have.nested.property('anfitrion.id', this.sesiones.usuarioActual().id)
});

Then('veo una nueva publicación con {string} nulo', function (campo: string) {
    expect(this.last_response.body).to.have.nested.property(campo).be.null
});

Then('veo que no hay publicaciones', async function () {
    await Publicaciones.listar(this)
    expect(this.last_response.body).to.eql([])
});

Then('no obtengo publicaciones', async function () {
    expect(this.last_response.body).to.eql([])
});

Then('recibo un pedido de registro de publicación', function () {
    expect(this.servicioPagos.crearPublicacion).to.have.been.calledWithMatch({
        id: this.last_publicacion.body.id
    })
});

Then('no recibo un pedido de registro de publicación', function () {
    expect(this.servicioPagos.crearPublicacion).not.to.have.been.called
});

import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import _ from "lodash"
import Publicaciones from "../Publicaciones";
import {validarConjunto, validarObjeto} from "../../../util/Validacion";
import chaiSubset from "chai-subset";
import Usuarios from "../../../usuarios/support/Usuarios";
import {v4 as uuidv4} from 'uuid';
import Eventos from "../../../common/Eventos";
import Sesiones from "../../../sesiones/support/Sesiones";

chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;


export async function crearPublicacion(this: any, dataTable: TableDefinition) {
    const publicacion: any = Publicaciones.ejemplo()
    dataTable.raw().forEach(([clave, valor]) => {
        _.set(publicacion, clave, valor)
    })
    publicacion.precioPorNoche = parseFloat(publicacion.precioPorNoche)
    publicacion.cantidadDeHuespedes = parseFloat(publicacion.cantidadDeHuespedes)
    publicacion.direccion.coordenadas.latitud = parseFloat(publicacion.direccion.coordenadas.latitud)
    publicacion.direccion.coordenadas.longitud = parseFloat(publicacion.direccion.coordenadas.longitud)

    await Publicaciones.crear(this, publicacion)
}

Given(/^que existe una publicacion (:?"([^"]*)" )?con:$/, async function (estado: string, publicacion: TableDefinition) {
    await Usuarios.crear(this, {
        ...Usuarios.ejemplo(),
        role: 'anfitrión',
        email: 'anfitrion@bookbnb.com'
    })
    await Sesiones.crear(this, this.last_response.body.email, this.last_response.body.password)

    await this.sesiones.ejecutarBajoSesion(async () => {
        await crearPublicacion.bind(this)(publicacion)
        await Eventos.registarEstadoPublicacion(this, estado || 'creada', this.last_response.body.id)
    }, 'anfitrion@bookbnb.com');
});

Given('que el {string} con email {string} tiene una publicación {string} con:', async function (rol: string, email: string, estadoPublicacion: string, dataTable) {
    await Usuarios.crear(this, {...Usuarios.ejemplo(), email, role: rol})
    await Sesiones.crear(this, this.last_response.body.email, this.last_response.body.password)

    await this.sesiones.ejecutarBajoSesion(async () => {
        await crearPublicacion.bind(this)(dataTable)
    }, email);

    await Eventos.registarEstadoPublicacion(this, estadoPublicacion, this.last_response.body.id)
});

When(/^(?:notifico|se notifica) que la publicación con título "([^"]*)" fue registrada con éxito$/, async function (titulo) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await Eventos.publicacionRegistrada(this, this.last_publicacion.body.id)
});

When(/^(?:notifico|se notifica|que se notifica) que la publicación con título "([^"]*)" no pudo registrarse$/, async function (titulo) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await Eventos.publicacionRechazada(this, this.last_publicacion.body.id)
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

When('busco las primeras {int} publicaciones', async function (cantidad: number) {
    await Publicaciones.listar(this, {cantidad})
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

Then('veo una nueva publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarObjeto(this.last_response.body, dataTable)
})

Then('veo que está publicada a mí nombre', function () {
    expect(this.last_response.body).to.have.nested.property('anfitrion.id', this.sesiones.usuarioActual().id)
});

Then('veo una publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
    validarObjeto(this.last_response.body, dataTable)
})

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


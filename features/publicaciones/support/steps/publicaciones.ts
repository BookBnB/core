import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import {crearUsuario, iniciarSesion} from "../../../sesiones/support/steps/sesiones";
import _ from "lodash"
import Publicaciones from "../Publicaciones";
import { validarObjeto } from "../../../util/Validacion";
import chaiSubset from "chai-subset";
import Usuarios from "../../../usuarios/support/Usuarios";
import { v4 as uuidv4 } from 'uuid';

chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;

async function crearUsuarioConRol(this: any, rol: string, email: string = 'john@doe.com') {
    await crearUsuario.bind(this)({
        nombre: 'John Doe',
        email: email,
        password: 'password',
        role: rol
    })
    await iniciarSesion.bind(this)(email, 'password')
}

Given('que soy {string}', async function (rol: string) { 
    await crearUsuarioConRol.bind(this)(rol);
});

const crearPublicacion = async function (this: any, dataTable: TableDefinition) {
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

Then('veo que está publicada a mí nombre', function () {
    expect(this.last_response.body).to.have.nested.property('anfitrion.id', this.usuarioActual.id)
});

When('creo una publicación con:', crearPublicacion)

Given('que existe una publicacion', async function() {
    const publicacion = Publicaciones.ejemplo()
    await Publicaciones.crear(this, publicacion)
});

Then('veo una nueva publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarObjeto.bind(this)(dataTable)
})

Given('que existe una publicacion con:', async function (publicacion: TableDefinition) {
    await crearUsuarioConRol.bind(this)("anfitrión")
    await crearPublicacion.bind(this)(publicacion)
});

When('ingreso a la publicación con título {string}', async function (titulo: string) {
    if (this.last_response.body.titulo != titulo) throw new Error('No existe la publicación')
    await Publicaciones.obtener(this, this.last_response.body.id)
});

Then('veo una publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
    validarObjeto.bind(this)(dataTable)
})

Then('veo una nueva publicación con {string} nulo', function (campo: string) {
    expect(this.last_response.body).to.have.nested.property(campo).be.null
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

Then('veo que no hay publicaciones', async function () {
    await Publicaciones.listar(this)
    expect(this.last_response.body).to.eql([])
});

Then('no obtengo publicaciones', async function () {
    expect(this.last_response.body).to.eql([])
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

When('busco las primeras {int} publicaciones con {int} como precio máximo', async function (cantidad, precioPorNocheMaximo) {
    await Publicaciones.listar(this, {cantidad, precioPorNocheMaximo})
});

Then('veo las publicaciones:', function (dataTable: TableDefinition) {
    let publicaciones: any = dataTable.hashes()
    publicaciones = publicaciones.map((publicacion: any) => {
        const publicacionParseada: any = {}
        Object.entries(publicacion).forEach(([clave, valor]) => {
            _.set(publicacionParseada, clave, valor)
        })
        return {...publicacionParseada}
    })
    expect(this.last_response.body).to.lengthOf(publicaciones.length)
    expect(this.last_response.body).to.containSubset(publicaciones)
});

When('ingreso a la publicación con id {string}', async function (id: string) {
    await Publicaciones.obtener(this, id)
});

When('listo mis publicaciones', async function () {
    await Usuarios.listarPublicaciones(this, this.usuarioActual.id);
});

When('listo las publicaciones del anfitrion {string}', async function (email) {
    const usuario = this.gestorDeSesiones.obtenerUsuario(email)

    const id = usuario ? usuario.id : uuidv4()
    
    await Usuarios.listarPublicaciones(this, id)
});

When('listo las publicaciones del anfitrion de id {string}', async function (id) {
    await Usuarios.listarPublicaciones(this, id);
});

Given('que existe un anfitrión {string}', async function (email) {
    await crearUsuarioConRol.bind(this)('anfitrión', email)
});

Given('que el anfitrión {string} tiene una publicación con:', async function (email, dataTable) {
    await this.gestorDeSesiones.ejecutarBajoSesion(this, async () => {
        await crearPublicacion.bind(this)(dataTable)
    }, email);
});

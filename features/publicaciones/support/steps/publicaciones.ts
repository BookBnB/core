import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import {crearUsuario, iniciarSesion} from "../../../sesiones/support/steps/sesiones";
import _ from "lodash"
import Publicaciones from "../Publicaciones";
import { validarObjeto } from "../../../util/Validacion";
import chaiSubset from "chai-subset";

chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;

async function crearUsuarioConRol(this: any, rol: string) {
    await crearUsuario.bind(this)({
        nombre: 'John Doe',
        email: 'john@doe.com',
        password: 'password',
        role: rol
    })
    await iniciarSesion.bind(this)('john@doe.com', 'password')
    this.tokenSesion = this.last_response.body.token;
}

Given('que soy {string}', crearUsuarioConRol);

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

When('listo las publicaciones', async function () {
    await Publicaciones.listar(this)
});

When('busco las primeras {int} publicaciones en un radio de {int} metros a {float}, {float}', async function (cantidad: number, radio: number, latitud: number, longitud: number) {
    await Publicaciones.listar(this, cantidad, latitud, longitud, radio)
});

When('busco las primeras {int} publicaciones', async function (cantidad: number) {
    await Publicaciones.listar(this, cantidad, 0, 0, 3000000000)
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

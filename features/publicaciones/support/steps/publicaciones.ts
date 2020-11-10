import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import {crearUsuario, iniciarSesion} from "../../../sesiones/support/steps/sesiones";
import _ from "lodash"
import Publicaciones from "../Publicaciones";

chai.use(chaiHttp);
const expect = chai.expect;

Given('que soy {string}', async function (rol: string) {
    await crearUsuario.bind(this)({
        nombre: 'John Doe',
        email: 'john@doe.com',
        password: 'password',
        role: rol
    })
    await iniciarSesion.bind(this)('john@doe.com', 'password')
    this.tokenSesion = this.last_response.body.token;
});

const crearPublicacion = async function (this: any, dataTable: TableDefinition) {
    const publicacion: any = {}
    dataTable.raw().forEach(([clave, valor]) => {
        _.set(publicacion, clave, valor)
    })
    publicacion.precioPorNoche = parseFloat(publicacion.precioPorNoche)
    publicacion.cantidadDeHuespedes = parseFloat(publicacion.cantidadDeHuespedes)
    publicacion.direccion.coordenadas.latitud = parseFloat(publicacion.direccion.coordenadas.latitud)
    publicacion.direccion.coordenadas.longitud = parseFloat(publicacion.direccion.coordenadas.longitud)

    await Publicaciones.crear(this, publicacion)
}

const validarPublicacion = function (this: any, dataTable: TableDefinition) {
    Object.entries(dataTable.rowsHash()).forEach(([propiedad, valor]) => {
        expect(this.last_response.body).to.have.nested.property(propiedad).satisfy((prop: any) => prop == valor)
    })
}

Then('veo que está a mí nombre', function () {
    expect(this.last_response.body).to.have.nested.property('anfitrion.email', this.usuarioActual.email)
});

When('creo una publicación con:', crearPublicacion)

Then('veo una nueva publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarPublicacion.bind(this)(dataTable)
})

Given('que existe una publicacion con:', crearPublicacion);

When('ingreso a la publicación con título {string}', async function (titulo: string) {
    if (this.last_response.body.titulo != titulo) throw new Error('No existe la publicación')
    await Publicaciones.obtener(this, this.last_response.body.id)
});

Then('veo una publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
    validarPublicacion.bind(this)(dataTable)
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

Then('veo un error indicado en el campo {string}', function (campoError: string) {
    expect(this.last_response).to.have.status(400)
    expect(this.last_response).to.be.json
    expect(campoError).to.include(this.last_response.body.errors[0].property)
});

Then('veo que no hay publicaciones', async function () {
    await Publicaciones.listar(this)
    expect(this.last_response.body).to.eql([])
});

When('listo las publicaciones', async function () {
    await Publicaciones.listar(this)
});

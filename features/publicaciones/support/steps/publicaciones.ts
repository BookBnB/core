import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import {crearUsuario, iniciarSesion} from "../../../sesiones/support/steps/sesiones";

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
    this.sessionToken = this.last_response.body.token;
});

const crearPublicacion = async function (this: any, dataTable: TableDefinition) {
    const data = dataTable.rowsHash();
    this.last_response = await chai.request(this.app)
        .post('/v1/publicaciones')
        .set('authorization', this.sessionToken)
        .type("json")
        .send({
            titulo: data.titulo,
            descripcion: data.descripcion,
            precioPorNoche: parseFloat(data.precioPorNoche),
            direccion: {
                calle: data.calle,
                numero: parseInt(data.numero),
            },
            cantidadDeHuespedes: parseInt(data.cantidadDeHuespedes)
        })
}

function deletePropertyPath(obj: any, path: string): any {
    const paths = path.split('.')
    let nestedObj = obj
    paths.forEach((attribute: string, n) => {
        if (n === paths.length - 1)
            delete nestedObj[attribute]
        else
            nestedObj = nestedObj[attribute]
    });
    return obj;
}

const validarPublicacion = function (this: any, dataTable: TableDefinition) {
    const data = dataTable.rowsHash()
    expect(this.last_response.body).to.have.property('titulo').to.be.equal(data.titulo)
    expect(this.last_response.body).to.have.property('descripcion').to.be.equal(data.descripcion)
    expect(this.last_response.body).to.have.property('precioPorNoche').to.be.equal(parseFloat(data.precioPorNoche))
    expect(this.last_response.body).to.have.nested.property('direccion.calle').to.be.equal(data.calle)
    expect(this.last_response.body).to.have.nested.property('direccion.numero').to.be.equal(parseFloat(data.numero))
    expect(this.last_response.body).to.have.property('cantidadDeHuespedes').to.be.equal(parseInt(data.cantidadDeHuespedes))
    expect(this.last_response.body).to.have.property('id')
}

When('creo una publicación con:', crearPublicacion)

Then('veo una nueva publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarPublicacion.bind(this)(dataTable)
})

Given('que existe una publicacion con:', crearPublicacion);

When('ingreso a la publicación con título {string}', async function (titulo: string) {
    if (this.last_response.body.titulo != titulo) throw new Error('No existe la publicación')
    this.last_response =
        await chai.request(this.app)
            .get(`/v1/publicaciones/${this.last_response.body.id}`)
            .set('authorization', this.sessionToken)
});

Then('veo una publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
    validarPublicacion.bind(this)(dataTable)
})

When('creo una publicación sin {string}:', {timeout: 2000 * 1000}, async function (campo: string) {
    const data = deletePropertyPath({
        titulo: 'Departamento con vista',
        descripcion: 'Hermoso departamento con vista al mar en Mar del Plata',
        precioPorNoche: 0.05,
        direccion: {
            calle: 'Av. Bv. Marítimo Patricio Peralta Ramos',
            numero: 4799,
        },
        cantidadDeHuespedes: 2
    }, campo)
    this.last_response = await chai.request(this.app)
        .post('/v1/publicaciones')
        .set('authorization', this.sessionToken)
        .type("json")
        .send(data)
});

Then('veo un error indicado en el campo {string}', function (campoError: string) {
    expect(this.last_response).to.have.status(400)
    expect(this.last_response).to.be.json
    expect(campoError).to.include(this.last_response.body.errors[0].property)
});

Then('veo que no hay publicaciones', async function () {
    const response = await chai.request(this.app)
        .get(`/v1/publicaciones`)
        .set('authorization', this.sessionToken)
    expect(response.body).to.eql([])
});

When('listo las publicaciones', async function () {
    this.last_response = await chai.request(this.app)
        .get(`/v1/publicaciones`)
        .set('authorization', this.sessionToken)
});

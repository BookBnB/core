import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"

chai.use(chaiHttp);
const expect = chai.expect;

Given('que soy anfitrión', function () {
})
Given('que soy huesped', function () {
});

const crearPublicacion = async function (this: any, dataTable: TableDefinition) {
    const data = dataTable.rowsHash();
    this.last_response = await chai.request(this.app)
        .post('/v1/publicaciones')
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

Given('que existe una publicacion con:', async function (dataTable: TableDefinition) {
    await crearPublicacion.bind(this)(dataTable)
});

When('ingreso a la publicación con título {string}', async function (titulo: string) {
    if(this.last_response.body.titulo != titulo) throw new Error('No existe la publicación')
    this.last_response = await chai.request(this.app)
        .get(`/v1/publicaciones/${this.last_response.body.id}`)
});

Then('veo una publicación con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
    validarPublicacion.bind(this)(dataTable)
})

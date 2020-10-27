import {Given, When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"

chai.use(chaiHttp);
const expect = chai.expect;

Given('que soy anfitrión', function () {
})

When('creo una publicación con:', async function (dataTable: TableDefinition) {
    const data = dataTable.rowsHash();
    this.response = await chai.request(await this.app)
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
})

Then('veo una publicación con:', function (dataTable: TableDefinition) {
    const data = dataTable.rowsHash()
    expect(this.response).to.have.status(201)
    expect(this.response).to.be.json
    expect(this.response.body).to.have.property('titulo').to.be.equal(data.titulo)
    expect(this.response.body).to.have.property('descripcion').to.be.equal(data.descripcion)
    expect(this.response.body).to.have.property('precioPorNoche').to.be.equal(parseFloat(data.precioPorNoche))
    expect(this.response.body).to.have.nested.property('direccion.calle').to.be.equal(data.calle)
    expect(this.response.body).to.have.nested.property('direccion.numero').to.be.equal(parseFloat(data.numero))
    expect(this.response.body).to.have.property('cantidadDeHuespedes').to.be.equal(parseInt(data.cantidadDeHuespedes))
    expect(this.response.body).to.have.property('id')
})

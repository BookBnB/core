import {When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import chaiSubset from "chai-subset"

chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;

const urlBase = '/v1/direcciones'

When('busco una dirección por {string}', async function (consulta: string) {
    this.last_response = await chai.request(this.app)
        .post(`${urlBase}/consulta`)
        .set('authorization', this.tokenSesion)
        .type("json")
        .send({
            consulta: consulta
        })
});

Then('veo una dirección con:', function (dataTable: TableDefinition) {
    const direccion: any = dataTable.rowsHash()
    direccion.coordenadas = {
        latitud: parseFloat(direccion['coordenadas.latitud']),
        longitud: parseFloat(direccion['coordenadas.longitud'])
    }
    delete direccion['coordenadas.latitud']
    delete direccion['coordenadas.longitud']
    expect(this.last_response.body).to.containSubset([direccion])
});

Then('no encuentro direcciones', function () {
    expect(this.last_response.body).to.eql([])
});

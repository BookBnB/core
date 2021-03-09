import {When, Then, TableDefinition} from "cucumber"
import chai from "chai"
import chaiHttp from "chai-http"
import chaiSubset from "chai-subset"
import Lugares from "../Lugares";

chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;

const validarLugar = function (this: any, dataTable: TableDefinition) {
    const direccion: any = dataTable.rowsHash()
    direccion.coordenadas = {
        latitud: parseFloat(direccion['coordenadas.latitud']),
        longitud: parseFloat(direccion['coordenadas.longitud'])
    }
    delete direccion['coordenadas.latitud']
    delete direccion['coordenadas.longitud']
    expect(this.last_response.body).to.containSubset([direccion])
}

When('busco una dirección por {string}', async function (consulta: string) {
    if(consulta === 'paseo colon 850')
        Lugares.mockPaseoColon(this)
    if(consulta === 'una dirección inexistente')
        Lugares.mockLugarInexistente(this)
    await Lugares.buscarDirecciones(this, consulta)
});

Then('veo una dirección con:', validarLugar);

Then('no encuentro direcciones', function () {
    expect(this.last_response.body).to.eql([])
});

When('busco una ciudad por {string}', async function (consulta: string) {
    if(consulta === 'potrerillos')
        Lugares.mockPotrerillos(this)
    if(consulta === 'una ciudad inexistente')
        Lugares.mockLugarInexistente(this)
    await Lugares.buscarCiudades(this, consulta)
});

Then('veo una ciudad con:', validarLugar);

Then('no encuentro ciudades', function () {
    expect(this.last_response.body).to.eql([])
});

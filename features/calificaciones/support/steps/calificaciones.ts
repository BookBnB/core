import chai from "chai"
import chaiHttp from "chai-http"
import chaiSubset from "chai-subset"
import {When} from "cucumber";
import Calificaciones from "../Calificaciones";

chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;

When('califico el alojamiento con título {string} con {int} puntos', async function (titulo, puntos) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await Calificaciones.calificarAlojamiento(this, this.last_publicacion.body.id, {puntos})
});

import chai from "chai"
import chaiHttp from "chai-http"
import chaiSubset from "chai-subset"
import {Given, TableDefinition, When} from "cucumber";
import Calificaciones from "../Calificaciones";

chai.use(chaiHttp);
chai.use(chaiSubset);
const expect = chai.expect;

Given('que la publicación con título {string} tiene las calificaciones:', async function (titulo, calificaciones: TableDefinition) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await calificaciones.hashes().reduce(async (memo: any, calificacion) => {
        await memo;
        await Calificaciones.calificarAlojamiento(this, this.last_publicacion.body.id, {
            puntos: parseInt(calificacion.puntos),
            detalle: calificacion.detalle
        })
    }, []);
});

When('califico el alojamiento con título {string} con {int} puntos', async function (titulo, puntos) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await Calificaciones.calificarAlojamiento(this, this.last_publicacion.body.id, {puntos})
});

When('califico el alojamiento con título {string} con {int} puntos y detalle {string}', async function (titulo, puntos, detalle) {
    expect(this.last_publicacion.body.titulo).to.eql(titulo)

    await Calificaciones.calificarAlojamiento(this, this.last_publicacion.body.id, {puntos, detalle})
});


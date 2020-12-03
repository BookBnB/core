import {Given, TableDefinition, Then, When} from "cucumber";
import chai from "chai";
import Publicaciones from "../Publicaciones";
import {validarConjunto, validarObjeto} from "../../../util/Validacion";
import _ from "lodash";

const expect = chai.expect;

When('listo las preguntas de la publicación con título {string}', async function (titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo)
    await Publicaciones.listarPreguntas(this, this.last_publicacion.body.id)
});

When('pregunto {string} en la publicación con título {string}', async function (descripcion, titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo)
    await Publicaciones.preguntar(this, this.last_publicacion.body.id, descripcion)
});

Then('veo una nueva pregunta con:', function (dataTable) {
    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
    validarObjeto.bind(this)(dataTable)
});

Then('veo las preguntas:', function (dataTable) {
    validarConjunto.bind(this)(dataTable)
});

Then('no veo preguntas', function () {
    expect(this.last_response.body).to.eql([])
});

Given('que la publicacion con titulo {string} tiene las preguntas:', async function (titulo, preguntas: TableDefinition) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo)
    this.preguntas = []
    await Promise.all(preguntas.hashes().map(async pregunta => {
        await Publicaciones.preguntar(this, this.last_publicacion.body.id, pregunta.descripcion)
        this.preguntas.push(this.last_response.body)
    }))
});

When('respondo la pregunta {string} con {string} en la publicación con título {string}', async function (pregunta, respuesta, titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo)

    const preguntaId = this.preguntas.find(({descripcion}: any) => descripcion === pregunta)?.id
    expect(preguntaId).not.to.be.undefined

    await Publicaciones.responder(this, this.last_publicacion.body.id, preguntaId, respuesta)
});

Then('veo que la pregunta {string} tiene respuesta {string}', function (pregunta, respuesta) {
    const preguntaEncontrada = _.find(this.last_response.body, {descripcion: pregunta})
    expect(preguntaEncontrada.respuesta.descripcion).to.eql(respuesta)
});

Then('que la pregunta {string} no tiene respuesta', function (pregunta) {
    const preguntaEncontrada = _.find(this.last_response.body, {descripcion: pregunta})
    expect(preguntaEncontrada.respuesta).to.be.undefined
});

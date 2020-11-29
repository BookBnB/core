import {Then, When} from "cucumber";
import chai from "chai";
import Publicaciones from "../Publicaciones";
import {validarConjunto, validarObjeto} from "../../../util/Validacion";

const expect = chai.expect;

When('listo las preguntas de la publicación con título {string}', async function (titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo)
    await Publicaciones.listarPreguntas(this, this.last_publicacion.body.id)
});

When('pregunto {string} en la publicación con título {string}', async function (pregunta, titulo) {
    expect(this.last_publicacion.body.titulo).to.eq(titulo)
    await Publicaciones.preguntar(this, this.last_publicacion.body.id, pregunta)
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

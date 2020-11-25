import chai from "chai"
import chaiHttp from "chai-http"
import { Then } from 'cucumber';

chai.use(chaiHttp);
const expect = chai.expect;

Then('obtengo un mensaje de error {string}', function (error: string) {
    expect(this.last_response).to.be.json
    expect(this.last_response).to.have.status(400)
    expect(this.last_response.body).to.have.property('message').to.be.equal(error)
});

Then('veo un error indicado en el campo {string}', function (campoError: string) {
    expect(this.last_response).to.have.status(400)
    expect(this.last_response).to.be.json
    expect(campoError).to.include(this.last_response.body.errors[0].property)
});

Then('obtengo un error {int} con mensaje {string}', function (code, message) {
    expect(this.last_response).to.be.json
    expect(this.last_response).to.have.status(code)
    expect(this.last_response.body.message).to.include(message)
});

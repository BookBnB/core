import { describe, it } from "mocha";
import { expect } from "chai";
import {Sesion, SesionPayload} from "../../../../src/domain/sesiones/entidades/Sesion";
import JWTTokenBuilder from "../../../../src/infra/servicios/JWTTokenBuilder";

describe("Sesion", () => {
    it("devuelve el payload correcto", () => {
        const payload = new SesionPayload("user@user.com", "host", Math.trunc(Date.now() / 1000))
        const token = new JWTTokenBuilder('secret_key').buildToken(payload.toPlainObject())
        const sesion = new Sesion(token)
        expect(sesion.getPayload()).to.deep.equal(payload)
    });
});

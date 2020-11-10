import { describe, it } from "mocha";
import { expect } from "chai";
import {sign} from "jsonwebtoken";
import {Sesion, SesionPayload} from "../../../../src/domain/sesiones/entidades/Sesion";

describe("Sesion", () => {
    it("devuelve el payload correcto", () => {
        const payload = new SesionPayload("user@user.com", "host", Math.trunc(Date.now() / 1000))
        const sesion = new Sesion(sign(payload.toPlainObject(), 'secret_key'))
        expect(sesion.getPayload()).to.deep.equal(payload)
    });
});

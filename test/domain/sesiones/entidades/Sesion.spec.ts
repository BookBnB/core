import { describe, it } from "mocha";
import { expect } from "chai";
import {Sesion, SesionPayload} from "../../../../src/domain/sesiones/entidades/Sesion";
import JWTTokenBuilder from "../../../../src/infra/servicios/JWTTokenBuilder";
import { v4 as uuidv4 } from 'uuid';
import { RolUsuario } from "../../../../src/domain/usuarios/entidades/Usuario";

describe("Sesion", () => {
    it("devuelve el payload correcto", () => {
        const payload = new SesionPayload(uuidv4(), "user@user.com", RolUsuario.ANFITRION, Math.trunc(Date.now() / 1000))
        const token = new JWTTokenBuilder('secret_key').buildToken(payload)
        const sesion = new Sesion(token)
        expect(sesion.getPayload()).to.deep.equal(payload)
    });
});

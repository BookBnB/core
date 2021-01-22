import {describe, it} from "mocha";
import {expect} from "chai";
import Publicacion from "../../../../src/domain/publicaciones/entidades/Publicacion";
import Publicaciones from "../../../../features/publicaciones/support/Publicaciones";
import {v4 as uuidv4} from 'uuid';
import Usuario from "../../../../src/domain/usuarios/entidades/Usuario";

describe("Publicacion", () => {
    it("se crea correctamente", () => {
        const publicacionEjemplo = Publicaciones.ejemplo()
        const publicacion: Publicacion = new Publicacion({
            ...publicacionEjemplo,
            anfitrion: new Usuario(uuidv4(), "anfitrion")
        });

        expect(publicacion.titulo).to.equal(publicacionEjemplo.titulo);
    });
});

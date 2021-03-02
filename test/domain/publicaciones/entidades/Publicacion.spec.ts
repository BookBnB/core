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
            anfitrion: new Usuario(uuidv4(), 'host')
        });

        expect(publicacion.titulo).to.equal(publicacionEjemplo.titulo);
    });

    describe('Visibilidad', () => {
        describe('no estando bloqueada', () => {
            const pub = new Publicacion({
                ...Publicaciones.ejemplo(),
                anfitrion: new Usuario(uuidv4(), 'host')
            })
            
            it('es visible para un admin', () => {
                const usuario = new Usuario(uuidv4(), 'admin')
                expect(pub.bloqueadaPara(usuario)).to.be.false
            })

            it('es visible para un anfitrion', () => {
                const usuario = new Usuario(uuidv4(), 'host')
                expect(pub.bloqueadaPara(usuario)).to.be.false
            })

            it('es visible para un huesped', () => {
                const usuario = new Usuario(uuidv4(), 'guest')
                expect(pub.bloqueadaPara(usuario)).to.be.false
            })
        })

        describe('estando bloqueada', () => {
            const pub = new Publicacion({
                ...Publicaciones.ejemplo(),
                anfitrion: new Usuario(uuidv4(), 'host'),
                bloqueada: true
            })
            
            it('es visible para un admin', () => {
                const usuario = new Usuario(uuidv4(), 'admin')
                expect(pub.bloqueadaPara(usuario)).to.be.false
            })

            it('es visible para un anfitrion', () => {
                const usuario = new Usuario(uuidv4(), 'host')
                expect(pub.bloqueadaPara(usuario)).to.be.true
            })

            it('es visible para un huesped', () => {
                const usuario = new Usuario(uuidv4(), 'guest')
                expect(pub.bloqueadaPara(usuario)).to.be.true
            })
        })
    })
});

import { describe, it } from "mocha";
import { expect } from "chai";
import Publicacion from "../src/domain/publicaciones/entidades/Publicacion";
import Publicaciones from "../features/publicaciones/support/Publicaciones";

describe("Publicacion", () => {
	it("se crea correctamente", () => {
		const publicacionEjemplo = Publicaciones.ejemplo()
		const publicacion: Publicacion = new Publicacion({
			...publicacionEjemplo,
			anfitrion: {
				email: "unanfitrion@bbnb.test",
				rol: "anfitrion"
			}
		});

		expect(publicacion.titulo).to.equal(publicacionEjemplo.titulo);
	});
});

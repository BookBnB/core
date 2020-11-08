import { describe, it } from "mocha";
import { expect } from "chai";
import Publicacion from "../src/domain/publicaciones/entidades/Publicacion";

describe("Publicacion", () => {
	it("se crea correctamente", () => {
		const publicacion: Publicacion = new Publicacion({
			titulo: "un titulo",
			descripcion: "una descrpcion",
			direccion: {
				calle: "una calle",
				numero: 6587
			},
			cantidadDeHuespedes: 2,
			precioPorNoche: 10,
			anfitrionId: "unanfitrion@bbnb.test"
		});

		expect(publicacion.titulo).to.equal("un titulo");
	});
});

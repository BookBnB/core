import chai from "chai";
import chaiHttp from "chai-http";
import Recurso from "../../util/Recurso";

chai.use(chaiHttp);

export default class Publicaciones  extends Recurso {
    static readonly BASE_URL: string = '/v1/publicaciones'

    protected static baseUlr(): string {
        return this.BASE_URL;
    }

    public static async crear(context: any, publicacion: any) {
        await this.post(context, '/', publicacion)
    }

    public static async obtener(context: any, idPublicacion: string) {
        await this.get(context, `/${idPublicacion}`)
    }

    public static async listar(context: any, cantidad: number = 1, latitud: number = 0, longitud: number = 0, radio: number = 300000000) {
        await this.get(context, '/', {offset: 0, limit: cantidad, coordenadas: {latitud, longitud}, radio})
    }

    public static ejemplo() {
        return {
            titulo: 'Departamento con vista',
            descripcion: 'Hermoso departamento con vista al mar en Mar del Plata',
            precioPorNoche: 0.05,
            direccion: {
                pais: 'Argentina',
                provincia: 'Buenos Aires',
                ciudad: 'Mar del Plata',
                direccion: 'Av. Bv. Marítimo Patricio Peralta Ramos 4799',
                coordenadas: {
                    latitud: -38.0083,
                    longitud: -57.5385
                },
            },
            cantidadDeHuespedes: 2,
            imagenes: []
        }
    }
}

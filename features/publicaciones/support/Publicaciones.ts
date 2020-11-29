import chai from "chai";
import chaiHttp from "chai-http";
import Recurso from "../../util/Recurso";

chai.use(chaiHttp);

export default class Publicaciones extends Recurso {
    static readonly BASE_URL: string = '/v1/publicaciones'

    protected static baseUlr(): string {
        return this.BASE_URL;
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
            tipoDeAlojamiento: 'Alojamiento entero',
            imagenes: []
        }
    }

    public static async crear(context: any, publicacion: any) {
        await this.post(context, '/', publicacion)
        context.last_publicacion = context.last_response
    }

    public static async obtener(context: any, idPublicacion: string) {
        await this.get(context, `/${idPublicacion}`)
    }

    public static async listar(
        context: any,
        {
            cantidad = 100,
            latitud = 0,
            longitud = 0,
            radio = 300000000,
            tipoDeAlojamiento = undefined,
            cantidadDeHuespedes = undefined,
            precioPorNocheMinimo = undefined,
            precioPorNocheMaximo = undefined
        } = {}) {

        await this.get(context, '/', {
            offset: 0,
            limit: cantidad,
            coordenadas: {
                latitud,
                longitud
            },
            radio,
            tipoDeAlojamiento,
            cantidadDeHuespedes,
            precioPorNocheMinimo,
            precioPorNocheMaximo
        })
    }

    public static async listarPreguntas(context: any, idPublicacion: string) {
        await this.get(context, `/${idPublicacion}/preguntas`)
    }

    public static async preguntar(context: any, idPublicacion: string, descripcion: string) {
        await this.post(context, `/${idPublicacion}/preguntas`, {descripcion})
    }
}

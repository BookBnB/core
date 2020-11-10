import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

export default class Publicaciones {
    static readonly BASE_URL: string = '/v1/publicaciones'

    public static async crear(context: any, publicacion: any) {
        context.last_response = await chai.request(context.app)
            .post(Publicaciones.BASE_URL)
            .set('authorization', context.tokenSesion)
            .send(publicacion)
    }

    public static async obtener(context: any, idPublicacion: string) {
        context.last_response = await chai.request(context.app)
            .get(`${Publicaciones.BASE_URL}/${idPublicacion}`)
            .set('authorization', context.tokenSesion)
    }

    public static async listar(context: any) {
        context.last_response = await chai.request(context.app)
            .get(Publicaciones.BASE_URL)
            .set('authorization', context.tokenSesion || '')
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

import chai from "chai";
import chaiHttp from "chai-http";
import {mockServer} from "../../doubles/server";
import {rest} from "msw";
import Recurso from "../../util/Recurso";

chai.use(chaiHttp);

export default class Lugares extends Recurso {
    static readonly BASE_URL: string = '/v1/lugares'

    protected static baseUlr(): string {
        return this.BASE_URL;
    }

    public static async buscarDirecciones(context: any, consulta: string) {
        await this.post(context, '/direcciones/consulta', {consulta: consulta})
    }

    public static async buscarCiudades(context: any, consulta: string) {
        await this.post(context, '/ciudades/consulta', {consulta: consulta})
    }

    public static mockLugarInexistente() {
        mockServer.use(rest.post('*/1/places/query', (req, res, context) => {
            return res(context.json({
                hits: []
            }))
        }))
    }

    public static mockPaseoColon() {
        mockServer.use(rest.post(`*/1/places/query`, (req, res, ctx) => {
            return res(
                ctx.json({
                    hits: [{
                        country: "Argentina",
                        city: ["Buenos Aires"],
                        locale_names: ["Avenida Paseo Colón 850"],
                        _geoloc: {lat: -34.6092, lng: -58.3697},
                        administrative: ["Ciudad Autónoma de Buenos Aires"]
                    }]
                })
            )
        }))
    }

    public static mockPotrerillos() {
        mockServer.use(rest.post('*/1/places/query', (req, res, context) => {
            return res(context.json({
                hits: [{
                    country: "Argentina",
                    county: ["Distrito Potrerillos"],
                    administrative: ["Mendoza"],
                    locale_names: ["Potrerillos"],
                    _geoloc: {lat: -32.9608, lng: -69.1974},
                }]
            }))
        }))
    }
}

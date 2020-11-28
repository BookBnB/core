import {describe, it} from "mocha";
import {server} from "../../mockHTTP";
import {rest} from "msw";
import ServicioLugares from "../../../src/infra/servicios/ServicioLugares";
import {expect} from "chai";
import Direccion from "../../../src/domain/lugares/entidades/Direccion";

describe('Servicio de lugares', () => {
    it('Devuelve la ciudad como null si no está en la respuesta de Algolia', async () => {
        server.use(rest.post(`*/1/places/query`, (req, res, ctx) => {
                const body = JSON.parse(<string>req.body)
                if (body.query.includes('potreri')) {
                    return res(
                        ctx.status(200),
                        ctx.json({
                            hits: [
                                {
                                    country: 'Argentina',
                                    administrative: ['La Rioja', 'Departamento Rosario Vera Peñaloza'],
                                    locale_names: ['Potrerillos de Las Flores'],
                                    _geoloc: {lat: -31.1435, lng: -66.4412},
                                },
                            ]
                        })
                    )
                }
            }
        ))

        const servicio = new ServicioLugares(process.env.ALGOLIA_APPLICATION_ID as string, process.env.ALGOLIA_ADMIN_API_KEY as string)
        expect(await servicio.buscarDirecciones({consulta: 'potreri'}, '')).to.deep.equal([
            new Direccion({
                pais: 'Argentina',
                provincia: 'La Rioja',
                ciudad: undefined,
                municipio: undefined,
                direccion: 'Potrerillos de Las Flores',
                coordenadas: {
                    latitud: -31.1435,
                    longitud: -66.4412
                }
            })
        ])
    })
})


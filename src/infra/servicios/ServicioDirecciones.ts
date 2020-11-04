import algoliasearch, {SearchClient} from "algoliasearch";
import { shuffle } from '@algolia/client-common';
import IServicioDirecciones from "../../domain/direcciones/servicios/ServicioDirecciones";
import {ConsultaDeDireccion} from "../../domain/direcciones/casos-uso/BuscarDirecciones";
import Direccion from "../../domain/direcciones/entidades/Direccion"

interface DireccionAlgolia {
    locale_names: string[]
    country: string
    city: string[]
    postcode: string[]
    county?: string[]
    country_code: string
    _geoloc: {lat: number, lng: number}
    objectID: string
}

class ConsultaDeDireccionAlgolia {
    private query: string;
    private type?: string;
    private hitsPerPage?: number;
    private language?: string;
    private countries?: string;
    private aroundLatLng?: string;
    private aroundRadius?: number;
    private getRankingInfo?: boolean;

    constructor(consulta: ConsultaDeDireccion) {
        this.query = consulta.consulta
        this.type = 'address'
        this.hitsPerPage = consulta.limite
        this.language = consulta.lenguaje
        this.countries = consulta.paises?.join(',')
        this.aroundLatLng = consulta.alrededorDeLatitudLongitud
        this.aroundRadius = consulta.alrededorRadio
        this.getRankingInfo = consulta.conInfoDeRanking
    }
}

export default class ServicioDirecciones implements IServicioDirecciones {
    private index: SearchClient;

    constructor(applicationId: string, adminKey: string) {
        this.index = algoliasearch(applicationId, adminKey, {
            hosts: [{ url: 'places-dsn.algolia.net' }].concat(
                shuffle([
                    { url: 'places-1.algolia.net' },
                    { url: 'places-2.algolia.net' },
                    { url: 'places-3.algolia.net' }
                ])
            ),
        })
    }

    async buscarDirecciones(consulta: ConsultaDeDireccion, ip: string): Promise<Direccion[]> {
        const resultado = await this.index.transporter.read({
            method: 'POST',
            path: '1/places/query',
            data: new ConsultaDeDireccionAlgolia(consulta),
            cacheable: true
        }, {
            headers: {
                'X-Forwarded-For': ip
            }
        }) as {hits: DireccionAlgolia[]};

        return resultado.hits.map(direccion => new Direccion({
            id: direccion.objectID,
            pais: direccion.country,
            codigoDePais: direccion.country_code,
            ciudad: direccion.city[0],
            municipio: direccion.county?.[0],
            codigoPostal: direccion.postcode[0],
            direccion: direccion.locale_names[0],
            coordenadas: {
                latitud: direccion._geoloc.lat,
                longitud: direccion._geoloc.lng,
            }
        }))
    }
}

import algoliasearch, {SearchClient} from "algoliasearch";
import { shuffle } from '@algolia/client-common';
import IServicioLugares from "../../domain/lugares/servicios/ServicioLugares";
import Direccion from "../../domain/lugares/entidades/Direccion"
import ConsultaDeLugar from "../../domain/lugares/casos-uso/ConsultaDeLugar";
import Ciudad from "../../domain/lugares/entidades/Ciudad";

interface ResultadoAlgolia {
    country: string
    administrative: string[]
    city: string[]
    county?: string[]
    locale_names: string[]
    _geoloc: {lat: number, lng: number}
}

class ConsultaAlgolia {
    private query: string;
    private type?: string;
    private hitsPerPage?: number;
    private language?: string;
    private countries?: string;
    private aroundLatLng?: string;
    private aroundRadius?: number;
    private getRankingInfo?: boolean;

    constructor(tipo: 'address' | 'city', consulta: ConsultaDeLugar) {
        this.query = consulta.consulta
        this.type = tipo
        this.hitsPerPage = consulta.limite
        this.language = consulta.lenguaje
        this.countries = consulta.paises?.join(',')
        this.aroundLatLng = consulta.alrededorDeLatitudLongitud
        this.aroundRadius = consulta.alrededorRadio
        this.getRankingInfo = consulta.conInfoDeRanking
    }
}

export default class ServicioLugares implements IServicioLugares {
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

    async buscarDirecciones(consulta: ConsultaDeLugar, ip: string): Promise<Direccion[]> {
        const resultado = await this.consultar(new ConsultaAlgolia('address', consulta), ip)

        return resultado.hits.map(direccion => new Direccion({
            pais: direccion?.country,
            provincia: direccion?.administrative?.[0],
            ciudad: direccion?.city?.[0],
            municipio: direccion?.county?.[0],
            direccion: direccion?.locale_names?.[0],
            coordenadas: {
                latitud: direccion._geoloc.lat,
                longitud: direccion._geoloc.lng,
            }
        }))
    }

    async buscarCiudades(consulta: ConsultaDeLugar, ip: string): Promise<Ciudad[]> {
        const resultado = await this.consultar(new ConsultaAlgolia('city', consulta), ip)

        return resultado.hits.map(direccion => new Ciudad({
            pais: direccion?.country,
            provincia: direccion?.administrative?.[0],
            ciudad: direccion?.locale_names?.[0],
            coordenadas: {
                latitud: direccion._geoloc.lat,
                longitud: direccion._geoloc.lng,
            }
        }))
    }

    private async consultar(data: object, ip: string): Promise<{ hits: ResultadoAlgolia[] }> {
        return await this.index.transporter.read({
            method: 'POST',
            path: '1/places/query',
            data: data,
            cacheable: true
        }, {
            headers: {
                'X-Forwarded-For': ip
            }
        }) as {hits: ResultadoAlgolia[]};
    }
}

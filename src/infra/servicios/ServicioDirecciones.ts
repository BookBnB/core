import algoliasearch, {SearchClient} from "algoliasearch";
import { shuffle } from '@algolia/client-common';
import IServicioDirecciones from "../../domain/lugares/servicios/ServicioDirecciones";
import Direccion from "../../domain/lugares/entidades/Direccion"
import ConsultaDeLugar from "../../domain/lugares/casos-uso/ConsultaDeLugar";

interface DireccionAlgolia {
    country: string
    administrative: string[]
    city: string[]
    county?: string[]
    locale_names: string[]
    _geoloc: {lat: number, lng: number}
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

    constructor(consulta: ConsultaDeLugar) {
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

    async buscarDirecciones(consulta: ConsultaDeLugar, ip: string): Promise<Direccion[]> {
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
            pais: direccion.country,
            provincia: direccion?.administrative[0],
            ciudad: direccion?.city[0],
            municipio: direccion?.county?.[0],
            direccion: direccion?.locale_names[0],
            coordenadas: {
                latitud: direccion._geoloc.lat,
                longitud: direccion._geoloc.lng,
            }
        }))
    }
}

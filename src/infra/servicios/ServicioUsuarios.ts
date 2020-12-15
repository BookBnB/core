import {Sesion} from "../../domain/sesiones/entidades/Sesion";
import IServicioUsuarios from "../../domain/sesiones/servicios/ServicioUsuarios";
import axios, {AxiosResponse} from 'axios';
import UsuarioNoReconocidoError from "../../domain/sesiones/excepciones/UsuarioNoReconocidoError";
import CrearSesionDTO from "../../domain/sesiones/casos-uso/CrearSesion";
import CrearSesionConGoogleDTO from "../../domain/sesiones/casos-uso/CrearSesionConGoogle";
import RequestError from "../../domain/common/excepciones/RequestError";

export default class ServicioUsuarios implements IServicioUsuarios {
    private readonly RUTA_SESION = '/v1/sesiones';
    private readonly RUTA_SESION_GOOGLE = '/v1/sesiones/google';

    constructor(private readonly serviceUrl: string) {
    }

    async crearSesion(body: CrearSesionDTO): Promise<Sesion> {
        return this.obtenerSesion(this.RUTA_SESION, body)
    }

    async crearSesionConGoogle(body: CrearSesionConGoogleDTO): Promise<Sesion> {
        return this.obtenerSesion(this.RUTA_SESION_GOOGLE, body)
    }

    private async obtenerSesion(url: string, body: any): Promise<Sesion> {
        const targetUrl = `${this.serviceUrl}${url}`
        try {
            const res: AxiosResponse = await axios.post(targetUrl, body);

            return new Sesion(res.data.token);
        } catch (e) {
            if (e.response.status === 401) throw new UsuarioNoReconocidoError('Usuario no reconocido');
            throw new RequestError(e.response.status, e.response.data.message)
        }
    }
}

import CrearSesionDTO from "../../domain/sesiones/dtos/CrearSesionDTO";
import { Sesion } from "../../domain/sesiones/entidades/Sesion";
import IServicioUsuarios from "../../domain/sesiones/servicios/ServicioUsuarios";
import axios, { AxiosResponse} from 'axios';
import UsuarioNoReconocidoError from "../../domain/sesiones/excepciones/UsuarioNoReconocidoError";

export default class ServicioUsuarios implements IServicioUsuarios {
    private readonly RUTA_SESION = '/v1/sesiones';

    constructor(private readonly serviceUrl: string) {
    }

    async crearSesion(body: CrearSesionDTO): Promise<Sesion> {
        const targetUrl = `${this.serviceUrl}${this.RUTA_SESION}`;

        try {
            const res: AxiosResponse = await axios.post(targetUrl, body);

            return new Sesion(res.data.token);
        } catch (e) {
            throw new UsuarioNoReconocidoError('Usuario no reconocido');
        }
    }
}

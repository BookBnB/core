import CrearSessionDTO from "../../domain/sesiones/dtos/CrearSessionDTO";
import { Session } from "../../domain/sesiones/entidades/Session";
import IUserService from "../../domain/sesiones/servicios/UserService";
import axios, { AxiosResponse} from 'axios';
import UsuarioNoReconocidoError from "../../domain/sesiones/excepciones/UsuarioNoReconocidoError";

export default class UserService implements IUserService {
    private readonly SESSION_PATH = '/v1/sessions';

    constructor(private readonly serviceUrl: string) {
    }

    async crearSession(body: CrearSessionDTO): Promise<Session> {
        const targetUrl = `${this.serviceUrl}${this.SESSION_PATH}`;

        try {
            const res: AxiosResponse = await axios.post(targetUrl, body);

            return new Session(res.data.token);
        } catch (e) {
            throw new UsuarioNoReconocidoError('Usuario no reconocido');
        }
    }
}

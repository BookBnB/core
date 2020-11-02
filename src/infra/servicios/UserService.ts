import CrearSessionDTO from "../../domain/sesiones/dtos/CrearSessionDTO";
import { SessionDTO } from "../../domain/sesiones/dtos/SessionDTO";
import IUserService from "../../domain/sesiones/servicios/UserService";
import axios, { AxiosResponse, AxiosError } from 'axios';
import UsuarioNoReconocidoError from "../../domain/sesiones/entidades/UsuarioNoReconocidoError";

export default class UserService implements IUserService {
    private readonly SESSION_PATH = '/v1/sessions';

    constructor(private readonly serviceUrl: string) {
    }

    async crearSession(body: CrearSessionDTO): Promise<SessionDTO> {
        const targetUrl = `${this.serviceUrl}${this.SESSION_PATH}`;

        try {
            const res: AxiosResponse = await axios.post(targetUrl, body);

            return new SessionDTO(res.data.token);
        } catch (e) {
            throw new UsuarioNoReconocidoError('Usuario no reconocido');
        }
    }
}
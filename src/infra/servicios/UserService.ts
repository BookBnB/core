import CrearSessionDTO from "../../domain/sesiones/casos-uso/CrearSession";
import { SessionDTO } from "../../domain/sesiones/dtos/SessionDTO";
import IUserService from "../../domain/sesiones/servicios/UserService";
import axios, { AxiosResponse } from 'axios';

export default class UserService implements IUserService {
    private readonly SESSION_PATH = '/v1/session';

    constructor(private readonly serviceUrl: string) {
    }

    async crearSession(body: CrearSessionDTO): Promise<SessionDTO> {
        const targetUrl = `${this.serviceUrl}${this.SESSION_PATH}`;

        const res: AxiosResponse = await axios.post(targetUrl, body);

        return new SessionDTO(res.data.token);
    }
}
import CrearSessionDTO from "../dtos/CrearSessionDTO";
import { Session } from "../entidades/Session";

export default interface IUserService {
    crearSession(body: CrearSessionDTO): Promise<Session>;
}

import CrearSessionDTO from "../dtos/CrearSessionDTO";
import { SessionDTO } from "../dtos/SessionDTO";

export default interface IUserService {
    crearSession(body: CrearSessionDTO): Promise<SessionDTO>;
}

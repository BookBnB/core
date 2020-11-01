import CrearSessionDTO from "../casos-uso/CrearSession";
import { SessionDTO } from "../dtos/SessionDTO";

export default interface IUserService {
    crearSession(body: CrearSessionDTO): Promise<SessionDTO>;
}

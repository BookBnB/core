import { UseCase } from "../../UseCase";
import CrearSessionDTO from "../dtos/CrearSessionDTO";
import { Session} from "../entidades/Session";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IUserService from "../servicios/UserService";

export class CrearSession implements UseCase {
    constructor(
        private readonly usersService: IUserService,
        private readonly jwtTokenBuilder: IJWTTokenBuilder
    ) {
    }

    async execute(body: CrearSessionDTO): Promise<Session> {
        const userSession: Session = await this.usersService.crearSession(body);

        return userSession.getNewToken(this.jwtTokenBuilder);
    }
}

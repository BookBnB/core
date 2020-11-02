import { UseCase } from "../../UseCase";
import CrearSessionDTO from "../dtos/CrearSessionDTO";
import { SessionDTO, SessionPayloadDTO } from "../dtos/SessionDTO";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IUserService from "../servicios/UserService";

export class CrearSession implements UseCase {
    constructor(
        private readonly usersService: IUserService,
        private readonly jwtTokenBuilder: IJWTTokenBuilder
    ) {
    }

    async execute(body: CrearSessionDTO): Promise<SessionDTO> {
        const userSession: SessionDTO = await this.usersService.crearSession(body);

        const payload: SessionPayloadDTO = userSession.getPayload();

        const newToken: string = this.jwtTokenBuilder.buildToken(payload.toPlainObject());

        return new SessionDTO(newToken);
    }
}
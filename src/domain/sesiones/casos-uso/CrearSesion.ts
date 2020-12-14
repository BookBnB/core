import { UseCase } from "../../UseCase";
import { Sesion} from "../entidades/Sesion";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IServicioUsuarios from "../servicios/ServicioUsuarios";
import { IsString } from "class-validator";

export default class CrearSesionDTO {
    @IsString() public email!: string;
    @IsString() public password!: string;
}

export class CrearSesion implements UseCase {
    constructor(
        private readonly servicioUsuarios: IServicioUsuarios,
        private readonly jwtTokenBuilder: IJWTTokenBuilder
    ) {
    }

    async execute(body: CrearSesionDTO): Promise<Sesion> {
        const sesionUsuario: Sesion = await this.servicioUsuarios.crearSesion(body);

        return sesionUsuario.getNewToken(this.jwtTokenBuilder);
    }
}

import { UseCase } from "../../UseCase";
import { Sesion} from "../entidades/Sesion";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IServicioUsuarios from "../servicios/ServicioUsuarios";
import { IsString } from "class-validator";

export default class CrearSesionConGoogleDTO {
    @IsString() public token!: string;
}

export class CrearSesionConGoogle implements UseCase {
    constructor(
        private readonly servicioUsuarios: IServicioUsuarios,
        private readonly jwtTokenBuilder: IJWTTokenBuilder
    ) {
    }

    async execute(body: CrearSesionConGoogleDTO): Promise<Sesion> {
        const sesionUsuario: Sesion = await this.servicioUsuarios.crearSesionConGoogle(body);

        return sesionUsuario.getNewToken(this.jwtTokenBuilder);
    }
}

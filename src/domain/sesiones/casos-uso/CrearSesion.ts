import { UseCase } from "../../UseCase";
import CrearSesionDTO from "../dtos/CrearSesionDTO";
import { Sesion} from "../entidades/Sesion";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IServicioUsuarios from "../servicios/ServicioUsuarios";

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

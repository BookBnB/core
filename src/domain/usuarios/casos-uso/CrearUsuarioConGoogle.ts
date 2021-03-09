import { IsOptional, IsString} from "class-validator";
import IServicioPagos from "../../common/servicios/ServicioPagos";
import IServicioUsuarios from "../../sesiones/servicios/ServicioUsuarios";
import { UseCase } from "../../UseCase";
import UsuarioDTO from "../dtos/UsuarioDTO";
import Usuario from "../entidades/Usuario";

export class CrearUsuarioConGoogleDTO {
    @IsString()
    public token!: string

    @IsString()
    public role!: string

    @IsString() @IsOptional()
    public phone?: string

    @IsString() @IsOptional()
    public city?: string
}

export class CrearUsuarioConGoogle implements UseCase {
    constructor(
        private readonly servicioPagos: IServicioPagos,
        private readonly servicioUsuarios: IServicioUsuarios
    ) {
    }

    async execute(body: CrearUsuarioConGoogleDTO): Promise<UsuarioDTO> {
        const usuario = await this.servicioUsuarios.crearUsuarioConGoogle(body)

        await this.servicioPagos.crearBilletera(new Usuario(usuario.id, usuario.role))

        return usuario
    }
}

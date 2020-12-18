import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import IServicioPagos from "../../common/servicios/ServicioPagos";
import IServicioUsuarios from "../../sesiones/servicios/ServicioUsuarios";
import { UseCase } from "../../UseCase";
import UsuarioDTO from "../dtos/UsuarioDTO";
import Usuario from "../entidades/Usuario";

export class CrearUsuarioDTO {
    @IsString() @IsEmail()
    public email!: string
    @IsString()
    public role!: string
    @IsString()
    public name!: string
    @IsString()
    public surname!: string
    @IsString()
    public password!: string
    @IsString() @IsOptional()
    public phone?: string
    @IsString() @IsOptional()
    public city?: string
}

export class CrearUsuario implements UseCase {
    constructor(
        private readonly servicioPagos: IServicioPagos,
        private readonly servicioUsuarios: IServicioUsuarios
    ) {
    }

    async execute(body: CrearUsuarioDTO): Promise<UsuarioDTO> {
        const usuario = await this.servicioUsuarios.crearUsuario(body)

        await this.servicioPagos.crearBilletera(new Usuario(usuario.id, usuario.role))

        return usuario
    }
}
import {IsEnum, IsOptional} from "class-validator";
import ReservaDTO from "../dtos/ReservaDTO";
import Reserva, {EstadoReserva} from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import Usuario from "../../usuarios/entidades/Usuario";
import UsuarioNoAutorizadoError from "../../common/excepciones/UsuarioNoAutorizadoError";

export class ConsultaDeReservasPorPublicacion {
    @IsEnum(EstadoReserva) @IsOptional()
    public estado?: EstadoReserva = undefined;
}

export class ListarReservasDePublicacion {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly publicaciones: IPublicacionRepositorio
    ) {
    }

    async execute(usuario: Usuario, publicacionId: string, consulta: ConsultaDeReservasPorPublicacion): Promise<ReservaDTO[]> {
        const publicacion = await this.publicaciones.obtener(publicacionId)
        if(!publicacion.anfitrion.esIgualA(usuario) && !usuario.tieneRol("admin"))
            throw new UsuarioNoAutorizadoError('El usuario no es el anfitrión de la publicación')

        return (await this.reservas.listar(publicacionId, consulta))
            .map((reserva: Reserva) => new ReservaDTO(reserva));
    }
}

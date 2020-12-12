import {IsUUID} from "class-validator";
import ReservaDTO from "../dtos/ReservaDTO";
import Reserva from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import Usuario from "../../usuarios/entidades/Usuario";
import UsuarioNoAutorizadoError from "../../common/excepciones/UsuarioNoAutorizadoError";

export class ConsultaDeReservasPorPublicacion {
    @IsUUID()
    public publicacionId!: string;
}

export class ListarReservasDePublicacion {
    constructor(
        private readonly reservas: IReservaRepositorio,
        private readonly publicaciones: IPublicacionRepositorio
    ) {
    }

    async execute(usuario: Usuario, consulta: ConsultaDeReservasPorPublicacion): Promise<ReservaDTO[]> {
        const publicacion = await this.publicaciones.obtener(consulta.publicacionId)
        if(!publicacion.anfitrion.esIgualA(usuario))
            throw new UsuarioNoAutorizadoError('El usuario no es el anfitrión de la publicación')

        return (await this.reservas.listar(consulta))
            .map((reserva: Reserva) => new ReservaDTO(reserva));
    }
}

import {IsUUID} from "class-validator";
import ReservaDTO from "../dtos/ReservaDTO";
import Reserva from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";

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

    async execute(consulta: ConsultaDeReservasPorPublicacion): Promise<ReservaDTO[]> {
        await this.publicaciones.obtener(consulta.publicacionId)
        return (await this.reservas.listar(consulta))
            .map((reserva: Reserva) => new ReservaDTO(reserva));
    }
}

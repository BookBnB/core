import {IsEnum, IsOptional} from "class-validator";
import ReservaDTO from "../dtos/ReservaDTO";
import Reserva, {EstadoReserva} from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class ConsultaDeReservasPorHuesped {
    @IsEnum(EstadoReserva) @IsOptional()
    public estado?: EstadoReserva = undefined;
}

export class ListarReservasDeHuesped {
    constructor(
        private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute(usuarioId: string, consulta: ConsultaDeReservasPorHuesped): Promise<ReservaDTO[]> {
        return (await this.reservas.listarDeHuesped(usuarioId, consulta))
            .map((reserva: Reserva) => new ReservaDTO(reserva));
    }
}

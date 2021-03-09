import {UseCase} from "../../UseCase";
import ReservaDTO from "../dtos/ReservaDTO";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class VerReserva implements UseCase {
    constructor(private readonly reservas: IReservaRepositorio) {
    }

    async execute(id: string): Promise<ReservaDTO> {
        const reserva = await this.reservas.obtener(id)
        return new ReservaDTO(reserva)
    }
}

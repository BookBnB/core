import { Repository } from "typeorm";
import Reserva from "../../domain/reservas/entidades/Reserva";
import IReservaRepositorio from "../../domain/reservas/repositorios/ReservaRepositorio";

export default class ReservaRepositorio implements IReservaRepositorio {
    public constructor(
        private readonly repo: Repository<Reserva>
    ) {
    }
    
    async guardar(reserva: Reserva): Promise<Reserva> {
        return this.repo.save(reserva);
    }
}
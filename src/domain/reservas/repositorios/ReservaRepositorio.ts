import Reserva from "../entidades/Reserva";
import {ConsultaDeReservasPorPublicacion} from "../casos-uso/ListarReservasDePublicacion";

export default interface IReservaRepositorio {
    guardar(reserva: Reserva): Promise<Reserva>;

    listar(consulta: ConsultaDeReservasPorPublicacion): Promise<Reserva[]>;
}

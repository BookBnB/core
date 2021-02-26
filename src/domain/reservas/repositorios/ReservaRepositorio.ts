import Reserva from "../entidades/Reserva";
import {ConsultaDeReservasPorPublicacion} from "../casos-uso/ListarReservasDePublicacion";
import {ConsultaDeReservasPorHuesped} from "../casos-uso/ListarReservasDeHuesped";

export default interface IReservaRepositorio {
    guardar(reserva: Reserva): Promise<Reserva>;

    listar(publicacionId:string, consulta: ConsultaDeReservasPorPublicacion): Promise<Reserva[]>;

    listarDeHuesped(huespedId: string, consulta: ConsultaDeReservasPorHuesped): Promise<Reserva[]>;

    obtener(id: string): Promise<Reserva>

    obtenerConReservasAnidadas(id: string): Promise<Reserva>

    reservasCreadasPorDia(fechaInicio: Date, fechaFin: Date): Promise<any[]>
}

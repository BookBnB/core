import Reserva from "../entidades/Reserva";

export default interface IReservaRepositorio {
    guardar(reserva: Reserva): Promise<Reserva>;
}

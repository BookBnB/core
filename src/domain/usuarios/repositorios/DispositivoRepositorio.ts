import Dispositivo from "../entidades/Dispositivo";
import Usuario from "../entidades/Usuario";

export default interface IDispositivoRepositorio {
    guardar(dispositivo: Dispositivo): Promise<Dispositivo>;

    obtener(usuario: Usuario): Promise<Dispositivo>;
}

import {UseCase} from "../../UseCase";
import Usuario from "../entidades/Usuario";
import IDispositivoRepositorio from "../repositorios/DispositivoRepositorio";
import Dispositivo from "../entidades/Dispositivo";
import DispositivoDTO from "../dtos/DispositivoDTO";
import DispositivoInexistenteError from "../excepciones/DispositivoInexistenteError";

export class GuardarDispositivo implements UseCase {
    constructor(
        private readonly dispositivos: IDispositivoRepositorio,
    ) {
    }

    async execute(usuario: Usuario, dto: DispositivoDTO): Promise<DispositivoDTO> {
        let dispositivo
        try {
            dispositivo = await this.dispositivos.obtener(usuario)
            dispositivo.token = dto.token
        } catch (error) {
            if (error instanceof DispositivoInexistenteError)
                dispositivo = new Dispositivo(usuario, dto.token)
            else
                throw error
        }

        await this.dispositivos.guardar(dispositivo)
        return dto
    }
}

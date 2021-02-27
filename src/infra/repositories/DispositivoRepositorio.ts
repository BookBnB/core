import {Repository} from "typeorm";
import IDispositivoRepositorio from "../../domain/usuarios/repositorios/DispositivoRepositorio";
import Dispositivo from "../../domain/usuarios/entidades/Dispositivo";
import Usuario from "../../domain/usuarios/entidades/Usuario";
import DispositivoInexistenteError from "../../domain/usuarios/excepciones/DispositivoInexistenteError";

export default class DispositivoRepositorio implements IDispositivoRepositorio {
    public constructor(
        private readonly repo: Repository<Dispositivo>
    ) {
    }

    guardar(dispositivo: Dispositivo): Promise<Dispositivo> {
        return this.repo.save(dispositivo);
    }

    async obtener(usuario: Usuario): Promise<Dispositivo> {
        const dispositivo = await this.repo.findOne(usuario.id);

        if(!dispositivo)
            throw new DispositivoInexistenteError(`El dispositivo del usuario con ${usuario.id} no existe.`)
        return dispositivo;
    }
}

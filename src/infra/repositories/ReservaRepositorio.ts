import {QueryFailedError, Repository} from "typeorm";
import Reserva from "../../domain/reservas/entidades/Reserva";
import IReservaRepositorio from "../../domain/reservas/repositorios/ReservaRepositorio";
import {customAlphabet} from "nanoid";
import {ConsultaDeReservasPorPublicacion} from "../../domain/reservas/casos-uso/ListarReservasDePublicacion";

export default class ReservaRepositorio implements IReservaRepositorio {
    public constructor(
        private readonly repo: Repository<Reserva>
    ) {
    }

    static ALFABETO_IDS: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ'

    async guardar(reserva: Reserva): Promise<Reserva> {
        return this.repo.hasId(reserva) ? await this.repo.save(reserva) : this.guardarNuevo(reserva)
    }

    private async guardarNuevo(reserva: Reserva): Promise<Reserva> {
        const nanoid = customAlphabet(ReservaRepositorio.ALFABETO_IDS, Reserva.LONGITUD_ID)
        let error;
        for (let i = 0; i < 3; i++) {
            reserva.id = nanoid()
            try {
                await this.repo.save(reserva)
                return reserva
            } catch (e) {
                error = e
                // @ts-ignore
                if (e instanceof QueryFailedError && e?.code === '23505' && e?.constraint?.startsWith('PK_'))
                    continue
                throw e
            }
        }
        throw error;
    }

    listar(publicacionId: string, {estado}: ConsultaDeReservasPorPublicacion): Promise<Reserva[]> {
        return this.repo.createQueryBuilder("reserva")
            .innerJoinAndSelect("reserva.publicacion", "publicacion")
            .where("publicacion.id = :publicacionId", {publicacionId: publicacionId})
            .andWhere(estado ? "reserva.estado = :estado" : "TRUE")
            .setParameters({
                estado
            })
            .getMany()
    }
}

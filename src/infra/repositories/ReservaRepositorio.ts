import {QueryFailedError, Repository} from "typeorm";
import Reserva from "../../domain/reservas/entidades/Reserva";
import IReservaRepositorio from "../../domain/reservas/repositorios/ReservaRepositorio";
import {customAlphabet} from "nanoid";
import {ConsultaDeReservasPorPublicacion} from "../../domain/reservas/casos-uso/ListarReservasDePublicacion";
import ReservaInexistenteError from "../../domain/reservas/excepciones/ReservaInexistenteError";
import {ConsultaDeReservasPorHuesped} from "../../domain/reservas/casos-uso/ListarReservasDeHuesped";

export default class ReservaRepositorio implements IReservaRepositorio {
    public constructor(
        private readonly repo: Repository<Reserva>
    ) {
    }

    static ALFABETO_IDS: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ'

    async guardar(reserva: Reserva): Promise<Reserva> {
        return this.repo.hasId(reserva) ? await this.repo.save(reserva) : this.guardarNuevo(reserva)
    }

    async obtener(id: string): Promise<Reserva> {
        const reserva = await this.repo.createQueryBuilder("reserva")
            .innerJoinAndSelect("reserva.publicacion", "publicacion")
            .where("reserva.id = :id", {id})
            .getOne()

        if (!reserva)
            throw new ReservaInexistenteError(`La reserva con id ${id} no existe.`)
        return reserva;
    }

    async obtenerConReservasAnidadas(id: string): Promise<Reserva> {
        const reserva = await this.repo.createQueryBuilder("reserva")
            .innerJoinAndSelect("reserva.publicacion", "publicacion")
            .innerJoinAndSelect("publicacion.reservas", "reservas")
            .where("reserva.id = :id", {id})
            .getOne()

        if (!reserva)
            throw new ReservaInexistenteError(`La reserva con id ${id} no existe.`)
        return reserva;
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
            .setParameters({estado})
            .getMany()
    }

    listarDeHuesped(huespedId: string, {estado}: ConsultaDeReservasPorHuesped): Promise<Reserva[]> {
        return this.repo.createQueryBuilder("reserva")
            .innerJoinAndSelect("reserva.publicacion", "publicacion")
            .where("reserva.huesped.id = :huespedId", {huespedId})
            .andWhere(estado ? "reserva.estado = :estado" : "TRUE")
            .setParameters({estado})
            .getMany()
    }

    reservasCreadasPorDia(fechaInicio: Date, fechaFin: Date): Promise<any[]> {
        return this.repo.createQueryBuilder('reserva')
            .where(fechaInicio ? ':fechaInicio <= reserva.fechaCreacion' : 'TRUE')
            .andWhere(fechaFin ? 'reserva.fechaCreacion <= :fechaFin' : 'TRUE')
            .groupBy('reserva.fechaCreacion')
            .select(['reserva.fechaCreacion AS "fechaCreacion"', 'COUNT(reserva.id) AS "cantidad"'])
            .setParameters({ fechaInicio, fechaFin })
            .getRawMany()
    }

    async reservasActivas(fechaInicio: Date, fechaFin: Date): Promise<any[]> {
        return this.repo.createQueryBuilder('reserva')
            .where('reserva.estado = \'aceptada\'')
            .innerJoin(`(
                SELECT DATE(generate_series) AS fecha
                FROM generate_series(:fechaInicio::timestamp, :fechaFin, '1 day')
            )`, 'f', 'reserva."fechaInicio" <= f."fecha" AND f."fecha" < reserva."fechaFin"')
            .groupBy('f.fecha')
            .select(['f."fecha"', 'COUNT(*) AS "cantidad"'])
            .orderBy('f.fecha')
            .setParameters({ fechaInicio, fechaFin })
            .getRawMany()
    }
}

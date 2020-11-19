import { Type } from "class-transformer";
import { IsDate, IsPositive, IsUUID } from "class-validator";
import Publicacion from "../../publicaciones/entidades/Publicacion";
import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import Usuario from "../../usuarios/entidades/Usuario";
import ReservaDTO from "../dtos/ReservaDTO";
import Reserva, { EstadoReserva } from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import {JSONSchema} from "class-validator-jsonschema";

export class CrearReservaDTO {
    @IsUUID()
    public publicacionId!: string;

    @IsDate() @Type(() => Date) @JSONSchema({example: "2020-11-19"})
    public fechaInicio!: Date;

    @IsDate() @Type(() => Date) @JSONSchema({example: "2020-11-21"})
    public fechaFin!: Date;

    @IsPositive()
    public precioPorNoche!: number;
}

export class CrearReserva {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio,
        private readonly reservas: IReservaRepositorio
    ) {
    }

    async execute(usuario: Usuario, body: CrearReservaDTO): Promise<ReservaDTO> {
        const publicacion: Publicacion = await this.publicaciones.obtener(body.publicacionId);

        const reserva: Reserva = new Reserva({
            fechaInicio: body.fechaInicio,
            fechaFin: body.fechaFin,
            precioPorNoche: body.precioPorNoche,
            publicacion: publicacion,
            huesped: usuario,
            estado: EstadoReserva.PENDIENTE
        });

        await this.reservas.guardar(reserva);

        return new ReservaDTO(reserva);
    }
}

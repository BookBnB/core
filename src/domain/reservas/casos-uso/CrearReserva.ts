import { Type } from "class-transformer";
import { IsDate, IsDateString, IsPositive, IsUUID } from "class-validator";
import Publicacion from "../../publicaciones/entidades/Publicacion";
import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import Usuario from "../../usuarios/entidades/Usuario";
import ReservaDTO from "../dtos/ReservaDTO";
import Reserva, { EstadoReserva } from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";

export class CrearReservaDTO {
    @IsUUID()
    public publicacionId!: string;

    @IsDate() @Type(() => Date)
    public fechaInicio!: Date;

    @IsDate() @Type(() => Date)
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

import { IsDate, IsPositive, IsString, IsUUID } from "class-validator";
import Reserva, { EstadoReserva } from "../entidades/Reserva"

export default class ReservaDTO {
    @IsUUID()
    public id!: string

    @IsUUID()
    public publicacionId!: string;

    @IsString()
    public huespedId!: string;

    @IsDate()
    public fechaInicio!: Date;

    @IsDate()
    public fechaFin!: Date;

    @IsString()
    public estado!: EstadoReserva;

    @IsPositive()
    public precioPorNoche: number;

    constructor(reserva: Reserva) {
        this.id = reserva.id || '';
        this.publicacionId = reserva.publicacion.id || '';
        this.huespedId = reserva.huesped.id;
        this.fechaInicio = reserva.fechaInicio;
        this.fechaFin = reserva.fechaFin;
        this.estado = reserva.estado;
        this.precioPorNoche = reserva.precioPorNoche;
    }
}
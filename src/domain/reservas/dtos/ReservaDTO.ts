import { IsDate, IsPositive, IsString, IsUUID } from "class-validator";
import Reserva, { EstadoReserva } from "../entidades/Reserva"

export default class ReservaDTO {
    @IsUUID()
    public id!: string

    @IsUUID()
    public publicacionId!: string;

    @IsString()
    public huespedEmail!: string;

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
        this.huespedEmail = reserva.huesped.email;
        this.fechaInicio = reserva.fechaInicio;
        this.fechaFin = reserva.fechaFin;
        this.estado = reserva.estado;
        this.precioPorNoche = reserva.precioPorNoche;
    }
}
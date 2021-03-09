import {IsDate, IsEnum, IsPositive, IsString, IsUUID} from "class-validator";
import Reserva, { EstadoReserva } from "../entidades/Reserva"
import {JSONSchema} from "class-validator-jsonschema";

export default class ReservaDTO {
    @IsString() @JSONSchema({example: "AL6KS8"})
    public id!: string

    @IsUUID()
    public publicacionId!: string;

    @IsString()
    public huespedId!: string;

    @IsDate() @JSONSchema({example: "2020-11-19"})
    public fechaInicio!: Date;

    @IsDate() @JSONSchema({example: "2020-11-21"})
    public fechaFin!: Date;

    @IsEnum(EstadoReserva)
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

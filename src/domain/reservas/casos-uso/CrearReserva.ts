import { Type } from "class-transformer";
import { IsDate, IsUUID } from "class-validator";
import Publicacion from "../../publicaciones/entidades/Publicacion";
import IPublicacionRepositorio from "../../publicaciones/repositorios/PublicacionRepositorio";
import Usuario from "../../usuarios/entidades/Usuario";
import ReservaDTO from "../dtos/ReservaDTO";
import Reserva from "../entidades/Reserva";
import IReservaRepositorio from "../repositorios/ReservaRepositorio";
import {JSONSchema} from "class-validator-jsonschema";
import IServicioPagos from "../../common/servicios/ServicioPagos";
import PublicacionBloqueadaError from "../../publicaciones/excepciones/PublicacionBloqueadaError";

export class CrearReservaDTO {
    @IsUUID()
    public publicacionId!: string;

    @IsDate() @Type(() => Date) @JSONSchema({example: "2020-11-19"})
    public fechaInicio!: Date;

    @IsDate() @Type(() => Date) @JSONSchema({example: "2020-11-21"})
    public fechaFin!: Date;
}

export class CrearReserva {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio,
        private readonly reservas: IReservaRepositorio,
        private readonly servicioPagos: IServicioPagos
    ) {
    }

    async execute(huesped: Usuario, body: CrearReservaDTO): Promise<ReservaDTO> {
        const publicacion: Publicacion = await this.publicaciones.obtener(body.publicacionId);

        if (publicacion.bloqueadaPara(huesped)) {
            throw new PublicacionBloqueadaError()
        }

        const reserva: Reserva = publicacion.crearReserva(huesped, body)

        await this.reservas.guardar(reserva)

        await this.servicioPagos.crearReserva(reserva)

        return new ReservaDTO(reserva);
    }
}

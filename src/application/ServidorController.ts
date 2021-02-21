import {IsEnum, IsString, IsUUID, MinLength} from "class-validator";
import {Body, Get, HttpCode, InternalServerError, JsonController, Post, QueryParams} from "routing-controllers";
import {OpenAPI, ResponseSchema} from "routing-controllers-openapi";
import IServicioPagos from "../domain/common/servicios/ServicioPagos";
import IServicioUsuarios from "../domain/sesiones/servicios/ServicioUsuarios";
import PublicacionDTO from "../domain/publicaciones/dtos/PublicacionDTO";
import {ConsultaDePublicaciones} from "../domain/publicaciones/casos-uso/BuscarPublicaciones";
import {JSONSchema} from "class-validator-jsonschema";

export enum TipoServidor {
    PAGOS = 'Pagos',
    USUARIOS = "Usuarios"
}

class CrearServidorDTO {
    @IsEnum(TipoServidor)
    public tipo!: TipoServidor

    @IsString()
    public nombre!: string
}

interface ServidorConstructor {
    id: string
    nombre: string
}

export class Servidor {
    @IsUUID(4)
    public id!: string

    @IsString() @MinLength(1)
    public nombre!: string

    @IsString() @JSONSchema({example: '53462d800dda97a2228c62c6204b89a67b77111253902420'})
    public token!: string

    constructor(params: ServidorConstructor) {
        Object.assign(this, params)
    }
}

interface ServidorDTOConstructor extends ServidorConstructor{
    tipo: TipoServidor
}

class ServidorDTO extends Servidor {
    @IsEnum(TipoServidor)
    public tipo!: TipoServidor

    constructor(params: ServidorDTOConstructor) {
        super(params);
        Object.assign(this, params)
    }
}

@OpenAPI({security: [{token: []}]})
@JsonController('/servidores')
export class ServidorController {
    constructor(
        private readonly servicioPagos: IServicioPagos,
        private readonly servicioUsuarios: IServicioUsuarios
    ) {
    }

    @Post('/')
    @HttpCode(201)
    @ResponseSchema(ServidorDTO)
    @OpenAPI({summary: 'Crea un servidor'})
    async crear(@Body() body: CrearServidorDTO): Promise<Servidor> {
        let servidor;
        if(body.tipo === TipoServidor.PAGOS) {
            servidor = await this.servicioPagos.crearServidor({nombre: body.nombre})
        } else if(body.tipo === TipoServidor.USUARIOS) {
            servidor = await this.servicioUsuarios.crearServidor({nombre: body.nombre})
        } else {
            throw new InternalServerError(`El tipo ${body.tipo} no existe.`)
        }

        return new ServidorDTO({
            tipo: body.tipo,
            ...servidor
        })
    }

    @Get('/')
    @OpenAPI({summary: 'Muestra una lista de servidores'})
    @ResponseSchema(ServidorDTO, {isArray: true})
    async listar(): Promise<ServidorDTO[]> {
        const servidores1 = (await this.servicioPagos.listarServidores()).map(
            servidor => new ServidorDTO({tipo: TipoServidor.PAGOS, ...servidor}))
        const servidores2 = (await this.servicioUsuarios.listarServidores()).map(
            servidor => new ServidorDTO({tipo: TipoServidor.USUARIOS, ...servidor}))
        return servidores1.concat(servidores2)
    }
}

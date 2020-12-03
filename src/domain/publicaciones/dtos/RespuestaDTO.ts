import {IsDate, IsString, IsUUID} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";
import Respuesta from "../entidades/Respuesta";

export default class RespuestaDTO {
    @IsDate() @JSONSchema({example: "2020-11-19"}) public creada: Date
    @IsString() public descripcion: string
    @IsUUID() public usuarioId: string

    constructor(respuesta: Respuesta) {
        this.creada = respuesta.creada
        this.descripcion = respuesta.descripcion
        this.usuarioId = respuesta.usuario.id
    }
}

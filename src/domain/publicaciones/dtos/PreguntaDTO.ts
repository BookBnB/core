import {IsDate, IsString, IsUUID} from "class-validator";
import Pregunta from "../entidades/Pregunta";
import {JSONSchema} from "class-validator-jsonschema";

export default class PreguntaDTO {
    @IsUUID() public id: string | undefined
    @IsDate() @JSONSchema({example: "2020-11-19"}) public creada: Date
    @IsString() public descripcion: string
    @IsUUID() public usuarioId: string

    constructor(pregunta: Pregunta) {
        this.id = pregunta.id
        this.creada = pregunta.creada
        this.descripcion = pregunta.descripcion
        this.usuarioId = pregunta.usuario.id
    }
}

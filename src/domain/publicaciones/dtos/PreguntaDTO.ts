import {IsDate, IsString, IsUUID, ValidateNested} from "class-validator";
import Pregunta from "../entidades/Pregunta";
import {JSONSchema} from "class-validator-jsonschema";
import RespuestaDTO from "./RespuestaDTO";
import {Type} from "class-transformer";

export default class PreguntaDTO {
    @IsUUID() public id: string | undefined
    @IsDate() @JSONSchema({example: "2020-11-19"}) public creada: Date
    @IsString() public descripcion: string
    @IsUUID() public usuarioId: string
    @ValidateNested() @Type(type => RespuestaDTO) public respuesta: RespuestaDTO | undefined

    constructor(pregunta: Pregunta) {
        this.id = pregunta.id
        this.creada = pregunta.creada
        this.descripcion = pregunta.descripcion
        this.usuarioId = pregunta.usuario.id
        if(pregunta.respuesta) this.respuesta = new RespuestaDTO(pregunta.respuesta)
    }
}

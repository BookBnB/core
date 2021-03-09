import {IsBoolean, IsString} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";

export default class ResultadoEvento {
    @IsBoolean()
    public success!: boolean

    @IsString() @JSONSchema({example: 'ok'})
    public message!: string

    constructor(success: boolean, message: string) {
        this.success = success
        this.message = message
    }

    public static success(): ResultadoEvento {
        return new ResultadoEvento(true, 'ok')
    }
}

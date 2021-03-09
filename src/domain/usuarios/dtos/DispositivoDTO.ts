import { IsString} from "class-validator"

export default class DispositivoDTO {
    @IsString()
    public token!: string

    constructor(params: any) {
        Object.assign(this, params)
    }
}

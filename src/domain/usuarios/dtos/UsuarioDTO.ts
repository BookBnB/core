import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator"

export default class UsuarioDTO {
    @IsUUID(4)
    public id!: string

    @IsString() @IsEmail()
    public email!: string

    @IsString()
    public role!: string

    @IsString()
    public name!: string

    @IsString()
    public surname!: string

    @IsString()
    public password!: string

    @IsString() @IsOptional()
    public phone?: string

    @IsString() @IsOptional()
    public city?: string

    constructor(params: any) {
        Object.assign(this, params)
    }
}
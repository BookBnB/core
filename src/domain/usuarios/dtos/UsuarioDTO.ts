import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator"
import { RolUsuario } from "../entidades/Usuario"

export default class UsuarioDTO {
    @IsUUID(4)
    public id!: string

    @IsString() @IsEmail()
    public email!: string

    @IsString()
    public role!: RolUsuario

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
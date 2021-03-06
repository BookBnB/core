import CrearSesionDTO from "../../domain/sesiones/casos-uso/CrearSesion";
import CrearSesionConGoogleDTO from "../../domain/sesiones/casos-uso/CrearSesionConGoogle";
import { Sesion } from "../../domain/sesiones/entidades/Sesion";
import UsuarioNoReconocidoError from "../../domain/sesiones/excepciones/UsuarioNoReconocidoError";
import IServicioUsuarios from "../../domain/sesiones/servicios/ServicioUsuarios";
import { CrearUsuarioDTO } from "../../domain/usuarios/casos-uso/CrearUsuario";
import UsuarioDTO from "../../domain/usuarios/dtos/UsuarioDTO";
import ApiExterna from "./ApiExterna";
import {Servidor} from "../../application/ServidorController";
import {CrearUsuarioConGoogleDTO} from "../../domain/usuarios/casos-uso/CrearUsuarioConGoogle";

export default class ServicioUsuarios extends ApiExterna implements IServicioUsuarios {
    private readonly RUTA_CREAR = '/v1/usuarios'
    private readonly RUTA_CREAR_GOOGLE = '/v1/usuarios/google'
    private readonly RUTA_SESION = '/v1/sesiones';
    private readonly RUTA_SESION_GOOGLE = '/v1/sesiones/google';
    private readonly RUTA_SERVIDORES = '/v1/servidores';

    constructor(private readonly serviceUrl: string) {
        super()
    }

    async crearSesion(body: CrearSesionDTO): Promise<Sesion> {
        return this.obtenerSesion(this.RUTA_SESION, body)
    }

    async crearSesionConGoogle(body: CrearSesionConGoogleDTO): Promise<Sesion> {
        return this.obtenerSesion(this.RUTA_SESION_GOOGLE, body)
    }

    private async obtenerSesion(url: string, body: any): Promise<Sesion> {
        try {
            const targetUrl = `${this.serviceUrl}${url}`
            const res = await this.post(targetUrl, body)

            return new Sesion(res.data.token);
        } catch (e) {
            if (e.httpCode == 401) throw new UsuarioNoReconocidoError('Usuario no reconocido')
            throw e
        }
    }

    async crearUsuario(body: CrearUsuarioDTO): Promise<UsuarioDTO> {
        const res = await this.post(`${this.serviceUrl}${this.RUTA_CREAR}`, body)

        return new UsuarioDTO(res.data)
    }

    async crearUsuarioConGoogle(body: CrearUsuarioConGoogleDTO): Promise<UsuarioDTO> {
        const res = await this.post(`${this.serviceUrl}${this.RUTA_CREAR_GOOGLE}`, body)

        return new UsuarioDTO(res.data)
    }

    async crearServidor(param: { nombre: string }): Promise<Servidor> {
        const res = await this.post(`${this.serviceUrl}${this.RUTA_SERVIDORES}`, param)

        return res.data
    }

    async listarServidores(): Promise<Servidor[]> {
        const res = await this.get(`${this.serviceUrl}${this.RUTA_SERVIDORES}`)

        return res.data
    }
}

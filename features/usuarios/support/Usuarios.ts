import Recurso from "../../util/Recurso";

export interface Usuario {
    id: string,
    email: string,
    password: string,
    name: string,
    role: string
}

export default class Usuarios extends Recurso {
    static readonly BASE_URL: string = '/v1/usuarios'

    protected static baseUlr(): string {
        return this.BASE_URL;
    }

    public static async listarPublicaciones(context: any, anfitrionId: string) {
        await this.get(context, `/${anfitrionId}/publicaciones`)
    }
}
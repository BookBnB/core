import {UseCase} from "../../UseCase";
import IUsuarioRepositorio from "../repositorios/UsuarioRepositorio";
import PublicacionDTO from "../../publicaciones/dtos/PublicacionDTO";
import Publicacion from "../../publicaciones/entidades/Publicacion";

export class ConsultaDePublicacionesPorAnfitrion {
    public anfitrionId!: string;

    constructor(anfitrionId: string) {
        this.anfitrionId = anfitrionId;
    }
}

export class ListarPublicacionesPorAnfitrion implements UseCase {
    constructor(private readonly usuarios: IUsuarioRepositorio) {
    }

    async execute(consulta: ConsultaDePublicacionesPorAnfitrion): Promise<PublicacionDTO[]> {
        const publicaciones: Publicacion[] = await this.usuarios.obtenerPublicaciones(consulta.anfitrionId)

        return publicaciones.map((publicacion: Publicacion): PublicacionDTO =>
                new PublicacionDTO(publicacion))
    }
}

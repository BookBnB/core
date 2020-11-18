import {UseCase} from "../../UseCase";
import PublicacionDTO from "../dtos/PublicacionDTO";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";
import Publicacion from "../entidades/Publicacion";
import ConsultaConPaginacion from "../../common/ConsultaConPaginacion";
import UUID from "../../common/UUID";

export class ConsultaDePublicacionesPorAnfitrion extends ConsultaConPaginacion {
    public anfitrionId!: UUID;

    constructor(anfitrionId: UUID) {
        super();
        this.anfitrionId = anfitrionId;
    }
}

export class ListarPublicacionesPorAnfitrion implements UseCase {
    constructor(private readonly publicaciones: IPublicacionRepositorio) {
    }

    async execute(consulta: ConsultaDePublicacionesPorAnfitrion): Promise<PublicacionDTO[]> {
        return (await this.publicaciones.listarPorAnfitrion(consulta))
            .map((publicacion: Publicacion): PublicacionDTO =>
                new PublicacionDTO(publicacion))
    }
}

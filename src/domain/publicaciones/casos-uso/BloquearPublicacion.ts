import { IsBoolean } from "class-validator";
import { UseCase } from "../../UseCase";
import Publicacion from "../entidades/Publicacion";
import IPublicacionRepositorio from "../repositorios/PublicacionRepositorio";

export class BloquearPublicacionDTO {
    @IsBoolean()
    public bloqueada!: boolean
}

export class BloquearPublicacion implements UseCase {
    constructor(
        private readonly publicaciones: IPublicacionRepositorio
    ) {
    }

    public async execute(id: string, body: BloquearPublicacionDTO): Promise<Publicacion> {
        let pub = await this.publicaciones.obtener(id)

        body.bloqueada ? pub.bloquear() : pub.desbloquear()

        pub = await this.publicaciones.guardar(pub)

        return pub
    }
} 
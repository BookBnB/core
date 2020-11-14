import Publicacion from "../entidades/Publicacion";
import {ConsultaDePublicaciones} from "../casos-uso/ListarPublicaciones";

export default interface IPublicacionRepositorio {
    guardar(publicacion: Publicacion): Promise<Publicacion>;

    obtener(id: string): Promise<Publicacion>;

    listar(consulta: ConsultaDePublicaciones): Promise<Publicacion[]>;
}

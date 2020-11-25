import Publicacion from "../entidades/Publicacion";
import {ConsultaGeograficaDePublicaciones} from "../casos-uso/ListarPublicacionesGeograficamente";

export default interface IPublicacionRepositorio {
    guardar(publicacion: Publicacion): Promise<Publicacion>;

    obtener(id: string): Promise<Publicacion>;

    listar(consulta: ConsultaGeograficaDePublicaciones): Promise<Publicacion[]>;
}

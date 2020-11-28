import Publicacion from "../../publicaciones/entidades/Publicacion";

export default interface IUsuarioRepositorio {
    obtenerPublicaciones(id: string): Promise<Publicacion[]>;
}

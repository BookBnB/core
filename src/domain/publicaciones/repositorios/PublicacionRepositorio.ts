import Publicacion from "../entidades/Publicacion";

export default interface IPublicacionRepositorio {
    guardar(publicacion: Publicacion): Promise<Publicacion>;

    obtener(id: string): Promise<Publicacion>;

    listar(offset: number, limit: number): Promise<Publicacion[]>;
}

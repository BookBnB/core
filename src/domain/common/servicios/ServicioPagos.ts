import Publicacion from "../../publicaciones/entidades/Publicacion";

export default interface IServicioPagos {
    crearPublicacion(publicacion: Publicacion): Promise<void>
}
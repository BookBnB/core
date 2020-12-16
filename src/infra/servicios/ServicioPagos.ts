import axios from 'axios';
import IServicioPagos from "../../domain/common/servicios/ServicioPagos";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";

export default class ServicioPagos implements IServicioPagos {
    constructor(private readonly url: string) {
    }

    async crearPublicacion(publicacion: Publicacion): Promise<void> {
        return axios.post(`${this.url}/v1/publicaciones`, {
            idPublicacion: publicacion.id,
            idUsuario: publicacion.anfitrion.id,
            precioPorNoche: publicacion.precioPorNoche
        })
    }
}
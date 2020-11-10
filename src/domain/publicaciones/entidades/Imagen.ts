import {Entity, ManyToOne, PrimaryColumn} from "typeorm";
import Publicacion from "./Publicacion";
import {IsUrl} from "class-validator";

@Entity()
export default class Imagen {
    @PrimaryColumn("text") @IsUrl()
    public url!: string

    @ManyToOne(() => Publicacion, publicacion => publicacion.imagenes)
    public publicacion!: Publicacion;
}

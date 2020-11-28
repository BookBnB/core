import {Entity, ManyToOne, PrimaryColumn} from "typeorm";
import Publicacion from "./Publicacion";
import {IsUrl} from "class-validator";
import {JSONSchema} from "class-validator-jsonschema";

@Entity()
export default class Imagen {
    @PrimaryColumn("text") @IsUrl() @JSONSchema({example: "https://via.placeholder.com/150"})
    public url!: string

    @ManyToOne(() => Publicacion, publicacion => publicacion.imagenes)
    public publicacion!: Publicacion;
}

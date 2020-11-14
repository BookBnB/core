import IJWTTokenBuilder from "../../domain/sesiones/servicios/JWTTokenBuilder";
import { sign } from 'jsonwebtoken';
import { SesionPayload } from "../../domain/sesiones/entidades/Sesion";

export default class JWTTokenBuilder implements IJWTTokenBuilder {
    constructor(private readonly secretKey: string) { }

    buildToken(payload: SesionPayload): string {
        return sign(payload.toPlainObject(), this.secretKey);
    }
}

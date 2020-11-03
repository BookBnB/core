import IJWTTokenBuilder from "../../domain/sesiones/servicios/JWTTokenBuilder";
import { sign } from 'jsonwebtoken';

export default class JWTTokenBuilder implements IJWTTokenBuilder {
    constructor(private readonly secretKey: string) { }

    buildToken(payload: Object): string {
        return sign(payload, this.secretKey);
    }
}

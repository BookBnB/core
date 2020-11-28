import IJWTTokenVerifier from "../../domain/sesiones/servicios/JWTTokenVerifier";
import { verify } from 'jsonwebtoken';
import { SesionPayload } from "../../domain/sesiones/entidades/Sesion";

export default class JWTTokenVerifier implements IJWTTokenVerifier {
    constructor(private readonly secretKey: string) { }

    verifyToken(token: string): boolean {
        try {
            verify(token, this.secretKey);
            return true;
        } catch (e) {
            return false;
        }
    }
}

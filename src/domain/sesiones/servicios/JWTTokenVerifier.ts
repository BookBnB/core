import { SesionPayload } from "../entidades/Sesion";

export default interface IJWTTokenVerifier {
    verifyToken(token: string): boolean;
}

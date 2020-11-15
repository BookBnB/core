import { SesionPayload } from "../entidades/Sesion";

export default interface IJWTTokenBuilder {
    buildToken(payload: SesionPayload): string;
}

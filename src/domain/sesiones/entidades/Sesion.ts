import {IsJWT} from "class-validator";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IReloj from "../../common/servicios/Reloj";
import IJWTTokenVerifier from "../servicios/JWTTokenVerifier";

export class SesionPayload {
    public id!: string;
    public role!: string;
    public exp!: number;

    constructor(id: string, role: string, exp: number) {
        this.id = id;
        this.role = role;
        this.exp = exp;
    }

    public toPlainObject(): Object {
        return {
            id: this.id,
            role: this.role,
            exp: this.exp
        }
    }
}

export class Sesion {
    @IsJWT() public token!: string;

    private static readonly PAYLOAD_INDEX = 1;

    constructor(token: string) {
        this.token = token;
    }

    public getPayload(): SesionPayload {
        const parts: string[] = this.token.split('.');

        const payloadString: string = Buffer.from(parts[Sesion.PAYLOAD_INDEX], 'base64').toString('ascii');

        const payload = JSON.parse(payloadString);

        return new SesionPayload(
            payload.id,
            payload.role,
            payload.exp
        );
    }

    getId(): string {
        return this.getPayload().id;
    }

    public getNewToken(tokenBuilder: IJWTTokenBuilder): Sesion {
        return new Sesion(tokenBuilder.buildToken(this.getPayload().toPlainObject()));
    }

    public valido(tokenVerifier: IJWTTokenVerifier): boolean {
        return tokenVerifier.verifyToken(this.token);
    }

    public expirado(reloj: IReloj): boolean {
        // El RFC7519 establece que el claim exp es en segundos
        // IReloj devuelve valores en millis
        const expMillis: number = this.getPayload().exp * 1000;
        return expMillis < reloj.ahora();
    }
}

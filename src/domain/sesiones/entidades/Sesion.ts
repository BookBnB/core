import {IsJWT} from "class-validator";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IReloj from "../../common/servicios/Reloj";

export class SesionPayload {
    public email!: string;
    public role!: string;
    public exp!: number;

    constructor(email: string, role: string, exp: number) {
        this.email = email;
        this.role = role;
        this.exp = exp;
    }

    public toPlainObject(): Object {
        return {
            email: this.email,
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
            payload.email,
            payload.role,
            payload.exp
        );
    }

    public getNewToken(tokenBuilder: IJWTTokenBuilder): Sesion {
        return new Sesion(tokenBuilder.buildToken(this.getPayload().toPlainObject()));
    }

    public expirado(reloj: IReloj): boolean {
        // El RFC7519 establece que el claim exp es en segundos
        // IReloj devuelve valores en millis
        const expMillis: number = this.getPayload().exp * 1000;
        return expMillis < reloj.ahora();
    }
}

import {IsJWT} from "class-validator";
import IJWTTokenBuilder from "../servicios/JWTTokenBuilder";

export class SessionPayload {
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

export class Session {
    @IsJWT() public token!: string;

    private static readonly PAYLOAD_INDEX = 1;

    constructor(token: string) {
        this.token = token;
    }

    public getPayload(): SessionPayload {
        const parts: string[] = this.token.split('.');

        const payloadString: string = Buffer.from(parts[Session.PAYLOAD_INDEX], 'base64').toString('ascii');

        const payload = JSON.parse(payloadString);

        return new SessionPayload(
            payload.email,
            payload.role,
            payload.exp
        );
    }

    public getNewToken(tokenBuilder: IJWTTokenBuilder): Session {
        return new Session(tokenBuilder.buildToken(this.getPayload().toPlainObject()));
    }
}

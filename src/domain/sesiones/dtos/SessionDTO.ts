import { IsJWT, IsNumber, IsString } from "class-validator";

export class SessionPayloadDTO {
    @IsString() public email!: string;
    @IsString() public role!: string;
    @IsNumber() public exp!: number;

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

export class SessionDTO {
    @IsJWT() public token!: string;

    private static readonly PAYLOAD_INDEX = 1;

    constructor(token: string) {
        this.token = token;
    }

    public getPayload(): SessionPayloadDTO {
        const parts: string[] = this.token.split('.');

        const payloadString: string = Buffer.from(parts[SessionDTO.PAYLOAD_INDEX], 'base64').toString('ascii');

        const payload = JSON.parse(payloadString);

        return new SessionPayloadDTO(
            payload.email,
            payload.role,
            payload.exp
        );
    }
}

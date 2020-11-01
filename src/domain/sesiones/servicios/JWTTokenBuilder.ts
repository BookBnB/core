export default interface IJWTTokenBuilder {
    buildToken(payload: Object): string;
}

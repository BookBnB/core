export default class Resultado {
    public success!: boolean
    public message!: string

    constructor(success: boolean, message: string) {
        this.success = success
        this.message = message
    }

    public static success(): Resultado {
        return new Resultado(true, 'ok')
    }
}
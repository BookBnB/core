export default class ResultadoEvento {
    public success!: boolean
    public message!: string

    constructor(success: boolean, message: string) {
        this.success = success
        this.message = message
    }

    public static success(): ResultadoEvento {
        return new ResultadoEvento(true, 'ok')
    }
}
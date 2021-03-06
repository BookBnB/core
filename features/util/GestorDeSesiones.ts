import Usuarios, {Usuario} from "../usuarios/support/Usuarios";
import Sesiones from "../sesiones/support/Sesiones";

interface Entrada {
    usuario: Usuario,
    token?: string
}

export default class GestorDeSesiones {
    private readonly entradas: Map<string, Entrada>;
    private _usuarioActual: Usuario | undefined;
    private _tokenActual: string | undefined;

    constructor() {
        this.entradas = new Map()
    }

    private static getClave(clave: string) {
        return `GestorDeSesiones_${clave}`
    }

    registrarUsuario(usuario: Usuario) {
        this.entradas.set(GestorDeSesiones.getClave(usuario.email), {usuario})
    }

    registrarActual(usuario: Usuario) {
        this._usuarioActual = usuario;
    }

    registrarSesion(email: string, token: string) {
        let entrada = this.entradas.get(GestorDeSesiones.getClave(email));
        if (entrada) entrada.token = token;
    }

    obtenerEntrada(email: string) {
        const entrada = this.entradas.get(GestorDeSesiones.getClave(email));
        if (!entrada) throw Error(`Sesion para usuario con email ${email} no encontrada`)
        return entrada
    }

    async ejecutarBajoSesion(callback: any, email: string) {
        const entrada = this.obtenerEntrada(email)        

        const usuarioPrevio = this._usuarioActual;
        const tokenPrevio = this._tokenActual;

        this._usuarioActual = entrada.usuario;
        this._tokenActual = entrada.token;

        await callback();

        this._usuarioActual = usuarioPrevio;
        this._tokenActual = tokenPrevio;
    }

    obtenerUsuario(email: string) {
        const entrada = this.entradas.get(GestorDeSesiones.getClave(email))
        return entrada ? entrada.usuario : null
    }

    usuarioActual(): Usuario | undefined {
        return this._usuarioActual
    }

    tokenActual(): string | undefined {
        return this._tokenActual
    }

    setTokenActual(token: string) {
        this._tokenActual = token
    }

    usarSesionDe(email: string) {
        const entrada = this.obtenerEntrada(email)

        if (!entrada.token)
            throw new Error('Token de sesión inexistente')

        this._usuarioActual = entrada.usuario
        this._tokenActual = entrada.token
    }
}

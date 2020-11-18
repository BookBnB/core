import { Usuario } from "../usuarios/support/Usuarios";
import Store from "./Store";

interface Entrada {
    usuario: Usuario,
    token?: string
}

export default class GestorDeSesiones {

    private getClave(clave: string) {
        return `GestorDeSesiones_${clave}`
    }

    async registrarUsuario(usuario: Usuario) {
        const entrada: Entrada = {
            usuario
        }

        Store.getInstance().set(this.getClave(usuario.email), entrada)
    }

    async registrarSesion(email: string, token: string) {
        let entrada: Entrada = Store.getInstance().get(this.getClave(email));

        if (entrada) {
            entrada.token = token;
        }
    }

    async ejecutarBajoSesion(contexto: any, callback: any, emailSesion: string) {
        const entrada: Entrada = Store.getInstance().get(this.getClave(emailSesion));

        const usuarioPrevio = contexto.usuarioActual;
        const tokenPrevio = contexto.tokenSesion;

        contexto.usuarioActual = entrada.usuario;
        contexto.tokenSesion = entrada.token;

        await callback.bind(contexto)();

        contexto.usuarioActual = usuarioPrevio;
        contexto.tokenSesion = tokenPrevio;
    }

    obtenerUsuario(email: string) {
        const entrada: Entrada = Store.getInstance().get(this.getClave(email))
        return entrada ? entrada.usuario : null
    }
}
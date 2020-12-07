import {Application} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";

export default class UsersServiceProxy {
    private readonly app: Application;

    public constructor({app}: { app: Application }) {
        this.app = app
        this.initilize()
    }

    private initilize() {
        this.app.use('/v1', createProxyMiddleware(UsersServiceProxy.proxyEndpoints(), {
            target: process.env.USERS_SERVICE_URL,
            changeOrigin: true,
        }))
    }

    /**
     * Tags cuyos endpoints actuarán como proxies.
     */
    public static proxyTags(): string[] {
        return ['Usuario']
    }

    /**
     * Endpoints que actuarán como proxies.
     */
    public static proxyEndpoints(): string[] {
        return ['/v1/roles', '/v1/usuarios']
    }
}

import {Application} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import {ILogger} from "../infra/logging/Logger";
import http from "http";

export default class UsersServiceProxy {

    public constructor({app, logger}: { app: Application, logger: ILogger}) {
        app.use('/v1', createProxyMiddleware(UsersServiceProxy.proxyEndpoints(), {
            target: process.env.USERS_SERVICE_URL,
            changeOrigin: true,
            logProvider: () => new UsersServiceProxyLoggerAdapter(logger),
            onProxyRes: (proxyRes: http.IncomingMessage, req: any, res: any) => {
                if(req.url === '/v1/usuarios' && req.method === 'POST' && proxyRes.statusCode === 201) {
                    console.log('creo un usuario')
                }
            }
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

class UsersServiceProxyLoggerAdapter {
    constructor(private readonly logger: ILogger) {
    }

    public log(m: any, ...args: any[]) {
        this.logger.debug(m, ...args)
    }

    public debug(m: any, ...args: any[]) {
        this.logger.debug(m, ...args)
    }

    public info(m: any, ...args: any[]) {
        this.logger.info(m, ...args)
    }

    public warn(m: any, ...args: any[]) {
        this.logger.warn(m, ...args)
    }

    public error(m: any, ...args: any[]) {
        this.logger.error(m, ...args)
    }
}

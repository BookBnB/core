import {Application} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import {ILogger} from "../infra/logging/Logger";

export default class UsersServiceProxy {

    public constructor({app, logger}: { app: Application, logger: ILogger}) {
        app.use('/v1', createProxyMiddleware(UsersServiceProxy.proxyEndpoints(), {
            target: process.env.USERS_SERVICE_URL,
            changeOrigin: true,
            logProvider: () => new UsersServiceProxyLoggerAdapter(logger)
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

    public log(...args: any[]) {
        this.logger.debug(args)
    }

    public debug(...args: any[]) {
        this.logger.debug(args)
    }

    public info(...args: any[]) {
        this.logger.info(args)
    }

    public warn(...args: any[]) {
        this.logger.warn(args)
    }

    public error(...args: any[]) {
        this.logger.error(args)
    }
}

import {Application, Request} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import {ILogger} from "../infra/logging/Logger";
import ServiceProxyLoggerAdapter from "./ServiceProxyLoggerAdapter";

export default class UsersServiceProxy {
    public constructor({app, logger}: { app: Application, logger: ILogger}) {
        app.use('/v1', createProxyMiddleware(UsersServiceProxy.filter, {
            target: process.env.USERS_SERVICE_URL,
            changeOrigin: true,
            logProvider: () => new ServiceProxyLoggerAdapter(logger),
        }))
    }

    /**
     * Tags cuyos endpoints actuarán como proxies.
     */
    public static proxyTags(): string[] {
        return ['Usuario']
    }

    public static filter(pathname: string, req: Request) {
        if (pathname === '/v1/usuarios' && req.method === 'POST') {
            return false;
        }

        const endpoints = UsersServiceProxy.proxyEndpoints()
        return endpoints.find(e => pathname.match(`^${e}`)) != undefined
    }

    /**
     * Endpoints que actuarán como proxies.
     */
    public static proxyEndpoints(): string[] {
        return ['/v1/roles', '/v1/usuarios']
    }
}

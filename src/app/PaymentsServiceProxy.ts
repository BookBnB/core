import { Application, Request } from "express";
import http from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ILogger } from "../infra/logging/Logger";
import ServiceProxyLoggerAdapter from "./ServiceProxyLoggerAdapter";

export default class PaymentsServiceProxy {
    public constructor({app, logger}: { app: Application, logger: ILogger}) {
        app.use('/v1', createProxyMiddleware(PaymentsServiceProxy.filter, {
            target: process.env.PAYMENTS_SERVICE_URL,
            changeOrigin: true,
            logProvider: () => new ServiceProxyLoggerAdapter(logger)
        }))
    }

    /**
     * Tags cuyos endpoints actuarán como proxies.
     */
    public static proxyTags(): string[] {
        return ['Servidor']
    }

    public static filter(pathname: string, req: Request): boolean {
        const endpoints = PaymentsServiceProxy.proxyEndpoints()
        return endpoints.find(e => e.test(pathname)) != undefined
    }

    /**
     * Endpoints que actuarán como proxies.
     */
    public static proxyEndpoints(): RegExp[] {
        return [
            /\/v1\/reservas\/\w*\/transacciones/,
            /^(\/v1\/billeteras).*/
        ]
    }
}

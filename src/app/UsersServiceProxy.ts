import {ILogger} from "../infra/logging/Logger";
import {Application} from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export default class UsersServiceProxy {
    private readonly app: Application;
    private readonly logger: ILogger;

    public constructor({app, logger}: { app: Application, logger: ILogger }) {
        this.app = app
        this.logger = logger
        this.initilize()
    }

    private initilize() {
        this.app.use('/v1/users', createProxyMiddleware({
            target: process.env.USERS_SERVICE_URL,
            changeOrigin: true,
        }))
    }
}

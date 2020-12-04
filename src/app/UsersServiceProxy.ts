import {Application} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";

export default class UsersServiceProxy {
    private readonly app: Application;

    public constructor({app}: { app: Application }) {
        this.app = app
        this.initilize()
    }

    private initilize() {
        this.app.use('/v1/usuarios', createProxyMiddleware({
            target: process.env.USERS_SERVICE_URL,
            changeOrigin: true,
            pathRewrite: {
                '^/v1/usuarios': '/v1/users'
            }
        }))
    }
}

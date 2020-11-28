import express, {Application} from "express";
import Log4JSLogger, {ILogger} from "../infra/logging/Logger";
import Cors from "./Cors";
import {HTTPErrorHandlerLogger, HTTPLogger} from "../infra/logging/HTTPLogger";
import Welcome from "./Welcome";
import UsersServiceProxy from "./UsersServiceProxy";
import Api from "./Api";
import {DIContainer} from "@wessberg/di";
import Registry from "../infra/container/registerTypes";

export default async (appLogger: ILogger): Promise<Application> => {
    const app = express();

    new Cors({app, logger: appLogger})
    new HTTPLogger({app, logger: appLogger})
    new Welcome(app)
    new UsersServiceProxy({app})
    new Api({
        app,
        logger: new Log4JSLogger('Api'),
        container: await new Registry().registrar(new DIContainer()),
        openApiInfo: {
            info: {
                title: 'BookBnB',
                version: '1.0.0'
            }
        }
    });
    new HTTPErrorHandlerLogger({app, logger: appLogger})

    return app
}

import Api from "./app/Api";
import {configure} from "log4js";
import Log4JSLogger from "./infra/logging/Logger";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import registerTypes from "./infra/container/registerTypes";
import {DIContainer} from "@wessberg/di";
import express from "express";
import Welcome from "./app/Welcome";
import UsersServiceProxy from "./app/UsersServiceProxy";


async function main() {
    dotenvExpand(dotenv.config())
    configure(require('../config/log-config.json'));

    const app = express();
    new Api({
        app,
        logger: new Log4JSLogger('Api'),
        container: await registerTypes(new DIContainer()),
        openApiInfo: {
            info: {
                title: 'BookBnB',
                version: '1.0.0'
            }
        }
    });
    new Welcome(app)
    new UsersServiceProxy({
        app,
        logger: new Log4JSLogger('UsersServiceProxy')
    })

    const DEFAULT_PORT: number = 3000;
    const port: number = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;
    const appLogger = new Log4JSLogger('Api')

    app.listen(port, () => appLogger.info(`Listening at port ${port}`))
}

main();

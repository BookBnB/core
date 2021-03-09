import {configure} from "log4js";
import {ILogger} from "./infra/logging/Logger";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import bookBnB from "./app/index"
import logConfig from '../config/log-config.json'
import {DIContainer} from "@wessberg/di";
import Registry from "./infra/container/registerTypes";
import ChatNotifications from "./app/ChatNotifications";
import IServicioNotificaciones from "./domain/common/servicios/ServicioNotificaciones";
import {app} from "firebase-admin/lib/firebase-namespace-api";

async function main() {
    dotenvExpand(dotenv.config())
    configure(logConfig);

    const DEFAULT_PORT: number = 3000;
    const port: number = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;

    const container = new DIContainer()
    await new Registry().registrar(container)

    const appLogger: ILogger = container.get<ILogger>();
    (await bookBnB(container)).listen(port, () => appLogger.info(`Listening at port ${port}`))

    new ChatNotifications(
        container.get<IServicioNotificaciones>(),
        container.get<app.App>(),
        appLogger
    )
}

main();

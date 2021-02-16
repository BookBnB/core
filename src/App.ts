import {configure} from "log4js";
import {ILogger} from "./infra/logging/Logger";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import app from "./app/index"
import logConfig from '../config/log-config.json'
import {DIContainer} from "@wessberg/di";
import Registry from "./infra/container/registerTypes";

async function main() {
    dotenvExpand(dotenv.config())
    configure(logConfig);

    const DEFAULT_PORT: number = 3000;
    const port: number = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;

    const container = new DIContainer()
    await new Registry().registrar(container)

    const appLogger: ILogger = container.get<ILogger>();
    (await app(container)).listen(port, () => appLogger.info(`Listening at port ${port}`))
}

main();

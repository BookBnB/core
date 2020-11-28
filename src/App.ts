import {configure} from "log4js";
import Log4JSLogger, {ILogger} from "./infra/logging/Logger";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import app from "./app"

async function main() {
    dotenvExpand(dotenv.config())
    configure(require('../config/log-config.json'));

    const DEFAULT_PORT: number = 3000;
    const port: number = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;

    const appLogger: ILogger = new Log4JSLogger('App');
    (await app(appLogger)).listen(port, () => appLogger.info(`Listening at port ${port}`))
}

main();

import {ILogger} from "../infra/logging/Logger";
import {Application} from "express";
import cors from "cors";

export default class Cors {

    constructor({app, logger}: { app: Application, logger: ILogger }) {
        app.use(cors({
            origin: process.env.BACKOFFICE_URL,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
        }))
        logger.debug(`CORS enabled for ${process.env.BACKOFFICE_URL}`)
    }
}

import express, {Application} from "express";
import {ILogger} from "../infra/logging/Logger";
import Cors from "./Cors";
import {HTTPErrorHandlerLogger, HTTPLogger} from "../infra/logging/HTTPLogger";
import Welcome from "./Welcome";
import UsersServiceProxy from "./UsersServiceProxy";
import Api from "./Api";
import OpenApiSpec from "./OpenApiSpec";
import {IContainer} from "../infra/container/Container";
import { IMetricMonitor } from "./metrics/MetricMonitor";
import PaymentsServiceProxy from "./PaymentsServiceProxy";

export default async (container: IContainer): Promise<Application> => {
    const app = express();
    const logger = container.get<ILogger>({identifier: "ILogger"})

    new Cors({app, logger})
    new HTTPLogger({app, logger})
    new Welcome(app)
    new Api({app, container, logger});
    await OpenApiSpec.crear({
        app,
        openApiInfo: {
            info: {
                title: 'BookBnB: Core',
                version: '1.0.0'
            }
        },
        logger
    })
    new UsersServiceProxy({app, logger})
    new PaymentsServiceProxy({app, logger})
    new HTTPErrorHandlerLogger({app, logger})

    const monitor = container.get<IMetricMonitor>({ identifier: "IMetricMonitor" })
    monitor.monitor(app)

    return app
}

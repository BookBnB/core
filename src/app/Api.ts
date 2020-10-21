import {Application} from "express";
import {ILogger} from "../infra/logging/Logger";
import "reflect-metadata"; // Necesario para routing-controllers
import {getMetadataArgsStorage, useContainer, useExpressServer} from "routing-controllers";
import {routingControllersToSpec} from 'routing-controllers-openapi';
import {validationMetadatasToSchemas} from 'class-validator-jsonschema'
import swaggerUi from 'swagger-ui-express';
import ContainerAdapter from "../infra/container/ContainerAdapter";
import {IContainer} from "../infra/container/Container";
import {HTTPErrorHandlerLogger, HTTPLogger} from '../infra/logging/HTTPLogger';
import {OpenAPIObject} from "openapi3-ts";

export interface ApiConstructor {
    app: Application,
    logger: ILogger,
    container: IContainer,
    openApiInfo?: Partial<OpenAPIObject>
}

export default class Api {
    private readonly app: Application;
    private readonly logger: ILogger;
    private readonly container: IContainer;
    private readonly openApiInfo: Partial<OpenAPIObject>;

    public constructor({app, logger, container, openApiInfo = {}}: ApiConstructor) {
        this.app = app
        this.logger = logger
        this.container = container
        this.openApiInfo = openApiInfo
        this.initialize()
    }

    public initialize(): void {
        this.useContainer();
        useExpressServer(this.app, this.options());
        this.serveApiDocs()
    }

    /**
     * Configura el container para instanciar los controladores.
     * @private
     */
    private useContainer() {
        useContainer(new ContainerAdapter(this.container));
    }

    /**
     * Muestra la documentación de la api.
     * @private
     */
    private serveApiDocs() {
        const schemas = validationMetadatasToSchemas({
            refPointerPrefix: '#/components/schemas/',
        })

        const spec = routingControllersToSpec(
            getMetadataArgsStorage(),
            this.options(),
            {
                ...this.openApiInfo,
                components: {schemas},
            }
        )

        this.app.use(`${this.options().routePrefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(spec));
        this.app.get(`${this.options().routePrefix}/api.json`, (req, res) =>
            res.json(spec));
    }

    /**
     * Opciones para routing-controllers.
     * @private
     */
    private options() {
        return {
            routePrefix: "/v1",
            controllers: [__dirname + "/../application/**/*"],
            middlewares: [
                HTTPLogger,
                HTTPErrorHandlerLogger
            ]
        }
    }
}

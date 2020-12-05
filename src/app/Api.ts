import {Application} from "express";
import {ILogger} from "../infra/logging/Logger";
import "reflect-metadata"; // Necesario para routing-controllers
import {getMetadataArgsStorage, RoutingControllersOptions, useContainer, useExpressServer} from "routing-controllers";
import {routingControllersToSpec} from 'routing-controllers-openapi';
import {validationMetadatasToSchemas} from 'class-validator-jsonschema'
import swaggerUi from 'swagger-ui-express';
import ContainerAdapter from "../infra/container/ContainerAdapter";
import {IContainer} from "../infra/container/Container";
import {OpenAPIObject} from "openapi3-ts";
import {defaultMetadataStorage} from "class-transformer/storage";
import {authorizationChecker, currentUserChecker} from "./checkers";
import axios from 'axios'
import {isURL} from "class-validator";
import {merge} from 'openapi-merge';
import UsersServiceProxy from "./UsersServiceProxy";


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

    private constructor({app, logger, container, openApiInfo = {}}: ApiConstructor) {
        this.app = app
        this.logger = logger
        this.container = container
        this.openApiInfo = openApiInfo
    }

    public static async crear(args: ApiConstructor) {
        const api = new Api(args)
        await api.initialize()
        return api
    }

    private async initialize(): Promise<void> {
        this.useContainer();
        useExpressServer(this.app, this.options());
        await this.serveApiDocs()
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
    private async serveApiDocs() {
        const schemas = validationMetadatasToSchemas({
            refPointerPrefix: '#/components/schemas/',
            classTransformerMetadataStorage: defaultMetadataStorage
        })

        const spec = routingControllersToSpec(
            getMetadataArgsStorage(),
            this.options(),
            {
                ...this.openApiInfo,
                components: {
                    schemas,
                    securitySchemes: {
                        token: {
                            type: 'apiKey',
                            in: 'header',
                            name: 'Authorization'
                        }
                    }
                },
            }
        )

        const usersSpec = await this.usersServiceApiDocs()
        // @ts-ignore
        const result = usersSpec ? this.mergeApiDocs(spec, usersSpec).output : spec

        this.app.use(`${this.options().routePrefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(result));
        this.app.get(`${this.options().routePrefix}/api.json`, (req, res) =>
            res.json(spec));
    }

    /**
     * Junta las especificaciones OpenApi en una.
     * @param spec
     * @param userSpec
     * @private
     */
    private mergeApiDocs(spec: object, userSpec: object) {
        return merge([
            {
                // @ts-ignore
                oas: spec
            }, {
                // @ts-ignore
                oas: userSpec,
                operationSelection: {
                    includeTags: UsersServiceProxy.proxyTags()
                }
            }
        ])
    }

    /**
     * Devuelve el spec del servicio de usuarios.
     * @private
     */
    private async usersServiceApiDocs() {
        const specUrl = process.env['USERS_OPENAPI_SPEC_URL']
        if (!isURL(specUrl as string, {require_tld: false, allow_underscores: true}))
            return

        return (await axios.get(specUrl as string)).data
    }

    /**
     * Opciones para routing-controllers.
     * @private
     */
    private options(): RoutingControllersOptions {
        return {
            routePrefix: "/v1",
            controllers: [__dirname + "/../application/**/*Controller.?s"],
            validation: true,
            defaultErrorHandler: false,
            currentUserChecker: currentUserChecker,
            authorizationChecker: authorizationChecker
        }
    }
}

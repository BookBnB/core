import {Application} from "express";
import {getMetadataArgsStorage} from "routing-controllers";
import {routingControllersToSpec} from 'routing-controllers-openapi';
import {validationMetadatasToSchemas} from 'class-validator-jsonschema'
import swaggerUi from 'swagger-ui-express';
import {OpenAPIObject} from "openapi3-ts";
import {defaultMetadataStorage} from "class-transformer/storage";
import axios from 'axios'
import {isURL} from "class-validator";
import {merge} from 'openapi-merge';
import UsersServiceProxy from "./UsersServiceProxy";
import Api from "./Api";
import {SuccessfulMergeResult} from "openapi-merge/dist/data";
import PaymentsServiceProxy from "./PaymentsServiceProxy";
import {ILogger} from "../infra/logging/Logger";


export interface ApiConstructor {
    app: Application,
    openApiInfo?: Partial<OpenAPIObject>,
    logger: ILogger
}

export default class OpenApiSpec {
    private readonly app: Application;
    private readonly openApiInfo: Partial<OpenAPIObject>;
    private readonly logger: ILogger;

    private constructor({app, openApiInfo = {}, logger}: ApiConstructor) {
        this.app = app
        this.openApiInfo = openApiInfo
        this.logger = logger
    }

    public static async crear(args: ApiConstructor) {
        const apiSpec = new OpenApiSpec(args)
        await apiSpec.initialize()
        return apiSpec
    }

    private async initialize(): Promise<void> {
        await this.serveApiDocs()
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

        const coreSpec = routingControllersToSpec(
            getMetadataArgsStorage(),
            Api.options(),
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

        const usersSpec = await this.serviceApiDocs(process.env['USERS_OPENAPI_SPEC_URL'] as string)
        const paymentsSpec = await this.serviceApiDocs(process.env['PAYMENTS_OPENAPI_SPEC_URL'] as string)

        // @ts-ignore
        let spec = usersSpec ? OpenApiSpec.mergeApiDocs(coreSpec, usersSpec, UsersServiceProxy.proxyTags()) : coreSpec
        spec = paymentsSpec ? OpenApiSpec.mergeApiDocs(spec, paymentsSpec, PaymentsServiceProxy.proxyTags()) : spec

        const {routePrefix} = Api.options()
        this.serveApiSpec(spec, `${routePrefix}/api.json`)
        this.serveSwagger(`${routePrefix}/api.json`,
            `${routePrefix}/api-docs`)
    }

    /**
     * Muestra la especificación OpenApi en la url dada.
     * @param spec
     * @param url
     * @private
     */
    private serveApiSpec(spec: object, url: string) {
        this.app.get(url, (req, res) => res.json(spec));
    }

    /**
     * Muestra la interfaz swagger en la url dada.
     * @param specUrl
     * @param swaggerUrl
     * @private
     */
    private serveSwagger(specUrl: string, swaggerUrl: string) {
        this.app.use(swaggerUrl,
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                explorer: true,
                swaggerOptions: {
                    url: specUrl,
                },
                customSiteTitle: 'BookBnB: Core'
            }));
    }

    /**
     * Junta las especificaciones OpenApi en una.
     * @param spec
     * @param otherSpec
     * @param tags
     * @private
     */
    private static mergeApiDocs(spec: object, otherSpec: object, tags: string[]) {
        return (merge([
            {
                // @ts-ignore
                oas: spec
            }, {
                // @ts-ignore
                oas: otherSpec,
                operationSelection: {
                    includeTags: tags,
                }
            }
        ]) as SuccessfulMergeResult).output
    }

    /**
     * Devuelve el spec de una url.
     * @private
     */
    private async serviceApiDocs(specUrl: string) {
        this.logger.info(`Buscando api docs en ${specUrl}.`)

        if (!isURL(specUrl as string, {require_tld: false, allow_underscores: true}))
            return

        try {
            const resultado = (await axios.get(specUrl as string)).data
            this.logger.debug(`Resultado de apidocs en ${specUrl}: ${JSON.stringify(resultado)}.`)
            return resultado
        } catch (e) {
            return
        }
    }
}

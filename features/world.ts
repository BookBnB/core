import {setWorldConstructor} from "cucumber";
import express, {Application} from "express"
import Api from "../src/app/Api";
import Log4JSLogger from "../src/infra/logging/Logger";
import registerTypes from "../src/infra/container/registerTypes";
import {DIContainer} from "@wessberg/di";

export class CustomWorld {
    public app: Promise<Application>;
    private attach: Function;

    constructor(args: { attach: Function; parameters: { [p: string]: any } }) {
        this.attach = args.attach;
        this.app = this.createApp();
    }

    async createApp(): Promise<Application> {
        process.env.TYPEORM_CONNECTION = 'sqlite'
        process.env.TYPEORM_DATABASE = ':memory:'
        process.env.TYPEORM_DROP_SCHEMA = 'true'
        process.env.TYPEORM_SYNCHRONIZE = 'true'
        process.env.TYPEORM_MIGRATIONS = './src/infra/migration/*.ts'
        process.env.TYPEORM_MIGRATIONS_DIR = './src/infra/migration'
        process.env.TYPEORM_ENTITIES = './src/domain/**/entidades/**/*'

        const app = express()
        await registerTypes(new DIContainer()).then(container => {
            new Api({
                app,
                logger: new Log4JSLogger('Api'),
                container: container,
            });
        })
        return app
    }
}

setWorldConstructor(CustomWorld);

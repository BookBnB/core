import {After, Before} from "cucumber";
import express from "express"
import Api from "../src/app/Api";
import Log4JSLogger from "../src/infra/logging/Logger";
import registerTypes from "../src/infra/container/registerTypes";
import {DIContainer} from "@wessberg/di";
import {Connection} from "typeorm";


Before(async function () {
    process.env.TYPEORM_CONNECTION = 'sqlite'
    process.env.TYPEORM_DATABASE = ':memory:'
    process.env.TYPEORM_SYNCHRONIZE = 'true'
    process.env.TYPEORM_ENTITIES = './src/domain/**/entidades/**/*'

    const app = express()
    this.app = app
    this.container = new DIContainer()
    return await registerTypes(this.container).then(container => {
        new Api({
            app,
            logger: new Log4JSLogger('Api'),
            container: container,
        });
    })
});

After(async function () {
    const container: DIContainer = this.container;
    return await container.get<Connection>().close()
})

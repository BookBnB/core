import {After, AfterAll, Before, BeforeAll} from "cucumber";
import express from "express"
import Api from "../src/app/Api";
import Log4JSLogger from "../src/infra/logging/Logger";
import {DIContainer} from "@wessberg/di";
import {Connection} from "typeorm";
import {buildServer} from './doubles/server';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import Store from "./util/Store";
import RelojFake from "./doubles/RelojFake";
import TestRegistry from "./doubles/TestRegistry";

dotenvExpand(dotenv.config())

const mockServer = buildServer();

BeforeAll(async function () {
    mockServer.listen();
});

Before(async function () {
    process.env.TYPEORM_CONNECTION = 'sqlite'
    process.env.TYPEORM_DATABASE = ':memory:'
    process.env.TYPEORM_SYNCHRONIZE = 'true'
    process.env.TYPEORM_ENTITIES = './src/domain/**/entidades/**/*'
    process.env.NODE_ENV = 'test'

    const app = express()
    this.app = app
    this.reloj = new RelojFake();
    this.container = new DIContainer()
    return await new TestRegistry(this.reloj).registrar(this.container).then(container => {
        new Api({
            app,
            logger: new Log4JSLogger('Api'),
            container: container,
        });
    })
});

After(async function () {
    Store.reset();

    mockServer.resetHandlers();

    const container: DIContainer = this.container;
    return await container.get<Connection>().close()
});

AfterAll(async function () {
    mockServer.close();
});

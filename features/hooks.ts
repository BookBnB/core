import {After, AfterAll, Before, BeforeAll} from "cucumber";
import express from "express"
import Api from "../src/app/Api";
import Log4JSLogger from "../src/infra/logging/Logger";
import {DIContainer} from "@wessberg/di";
import {Connection} from "typeorm";
import {mockServer} from './doubles/server';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import Store from "./util/Store";
import RelojFake from "./doubles/RelojFake";
import TestRegistry from "./doubles/TestRegistry";
import GestorDeSesiones from "./util/GestorDeSesiones";
import {configure} from "log4js";
import logConfig from "../config/log-config.json";

dotenvExpand(dotenv.config({path: 'features/.env'}))

/**
 * Setup mock server
 */
BeforeAll(() => {
    mockServer.listen()
});

After(() => {
    mockServer.resetHandlers();
});

AfterAll(() => {
    mockServer.close();
    Store.reset();
});

/**
 * Setup api
 */
BeforeAll(() => {
    if(process.env["LOGS"] === 'true') configure(logConfig);
})

Before(async function () {
    const app = express()
    this.app = app
    this.reloj = new RelojFake()
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
    const container: DIContainer = this.container;
    return await container.get<Connection>().close()
});

/**
 * Setup sesiones
 */
Before(function () {
    this.gestorDeSesiones = new GestorDeSesiones();
})

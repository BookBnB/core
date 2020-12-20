import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import {After, AfterAll, Before, BeforeAll} from "cucumber";
import {DIContainer} from "@wessberg/di";
import {Connection} from "typeorm";
import Store from "./util/Store";
import RelojFake from "./doubles/RelojFake";
import TestRegistry from "./doubles/TestRegistry";
import GestorDeSesiones from "./util/GestorDeSesiones";
import {configure} from "log4js";
import logConfig from "../config/log-config.json";
import app from "../src/app"
import ServicioPagos from '../src/infra/servicios/ServicioPagos';
import sinon from 'sinon'
import {setupServer} from "msw/node";
import {buildHandlers} from "./doubles/handlers";

dotenvExpand(dotenv.config({path: 'features/.env'}))

const mockServer = setupServer(...buildHandlers());

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
    this.reservas = {}

    this.reloj = new RelojFake()
    this.mockServer = mockServer
    this.mockServicioPagos = sinon.createStubInstance(ServicioPagos)
    this.container = new DIContainer()
    await new TestRegistry(
        this.reloj,
        this.mockServicioPagos
    ).registrar(this.container)
    this.app = await app(this.container)
});

After(async function () {
    const container: DIContainer = this.container;
    return await container.get<Connection>().close()
});

/**
 * Setup sesiones
 */
Before(function () {
    this.sesiones = new GestorDeSesiones();
})

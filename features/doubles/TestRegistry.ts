import Registry from "../../src/infra/container/registerTypes";
import IReloj from "../../src/domain/common/servicios/Reloj";
import {DIContainer} from "@wessberg/di";
import IServicioPagos from "../../src/domain/common/servicios/ServicioPagos";
import { IMetricMonitor } from "../../src/app/metrics/MetricMonitor";
import IServicioNotificaciones from "../../src/domain/common/servicios/ServicioNotificaciones";

export default class TestRegistry extends Registry {
    constructor(
        private readonly reloj: IReloj,
        private readonly mockServicioPagos: IServicioPagos,
        private readonly mockMonitor: IMetricMonitor,
        private readonly mockNotificaciones: IServicioNotificaciones,
    ) {
        super();
    }

    protected async registrarServicioNotificaciones(container: DIContainer) {
        container.registerSingleton<IServicioNotificaciones>(() => this.mockNotificaciones)
    }

    protected async registrarReloj(container: DIContainer) {
        container.registerSingleton<IReloj>(() => this.reloj);
    }

    protected async registrarServicioPagos(container: DIContainer) {
        container.registerSingleton<IServicioPagos>(() => this.mockServicioPagos)
    }

    protected async registrarMetricas(container: DIContainer) {
        container.registerSingleton<IMetricMonitor>(() => this.mockMonitor)
    }

    protected async registrarGoogleAdmin(container: DIContainer) {
        // No es necesaria para los tests
    }
}


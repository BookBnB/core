import Registry from "../../src/infra/container/registerTypes";
import IReloj from "../../src/domain/common/servicios/Reloj";
import {DIContainer} from "@wessberg/di";
import IServicioPagos from "../../src/domain/common/servicios/ServicioPagos";

export default class TestRegistry extends Registry {
    constructor(
        private readonly reloj: IReloj,
        private readonly mockServicioPagos: IServicioPagos
    ) {
        super();
    }

    protected async registrarReloj(container: DIContainer) {
        container.registerSingleton<IReloj>(() => this.reloj);
    }

    protected async registrarServicioPagos(container: DIContainer) {
        container.registerSingleton<IServicioPagos>(() => this.mockServicioPagos)
    }
}


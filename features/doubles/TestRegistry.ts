import Registry from "../../src/infra/container/registerTypes";
import IReloj from "../../src/domain/common/servicios/Reloj";
import {DIContainer} from "@wessberg/di";

export default class TestRegistry extends Registry {
    constructor(private readonly reloj: IReloj) {
        super();
    }

    protected async registrarReloj(container: DIContainer) {
        container.registerSingleton<IReloj>(() => this.reloj);
    }
}


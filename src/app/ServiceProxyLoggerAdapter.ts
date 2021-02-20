import {ILogger} from "../infra/logging/Logger";

export default class ServiceProxyLoggerAdapter {
    constructor(private readonly logger: ILogger) {
    }

    public log(m: any, ...args: any[]) {
        this.logger.debug(m, ...args)
    }

    public debug(m: any, ...args: any[]) {
        this.logger.debug(m, ...args)
    }

    public info(m: any, ...args: any[]) {
        this.logger.info(m, ...args)
    }

    public warn(m: any, ...args: any[]) {
        this.logger.warn(m, ...args)
    }

    public error(m: any, ...args: any[]) {
        this.logger.error(m, ...args)
    }
}

import { Request, Response, NextFunction } from 'express'
import {ExpressMiddlewareInterface, UnauthorizedError} from 'routing-controllers';
import { Sesion} from '../../domain/sesiones/entidades/Sesion';
import IReloj from "../../domain/common/servicios/Reloj";
import IJWTTokenVerifier from '../../domain/sesiones/servicios/JWTTokenVerifier';

export default class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    constructor(
        private readonly reloj: IReloj,
        private readonly tokenVerifier: IJWTTokenVerifier
    ) {
    }

    use(req: Request, resp: Response, next: NextFunction) {
        const token: string = req.get('authorization') || '';

        if (!token) throw new UnauthorizedError('Sesión no existente')

        const sesion: Sesion = new Sesion(token);

        if (!sesion.valido(this.tokenVerifier)) throw new UnauthorizedError('Sesión inválida');

        if (sesion.expirado(this.reloj)) throw new UnauthorizedError('Sesión expirada');

        next();
    }
}

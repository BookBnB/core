import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Sesion} from '../../domain/sesiones/entidades/Sesion';
import IReloj from "../../domain/common/servicios/Reloj";

export default class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    constructor(private readonly reloj: IReloj) {}

    use(req: Request, resp: Response, next: NextFunction) {
        const token: string = req.get('authorization') || '';

        if (!token) {
            resp.status(401)
                .json({
                    'message': 'Sesión no existente'
                });
            return;
        }

        const sesion: Sesion = new Sesion(token);

        if (sesion.expirado(this.reloj)) {
            resp.status(401)
                .json({
                    'message': 'Sesión expirada'
                });
            return;
        }

        next();
    }
}

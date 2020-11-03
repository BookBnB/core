import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Session} from '../../domain/sesiones/entidades/Session';
import IReloj from "../../domain/common/servicios/Reloj";

export default class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    constructor(private readonly reloj: IReloj) {}

    use(req: Request, resp: Response, next: NextFunction) {
        const token: string = req.get('authorization') || '';

        const session: Session = new Session(token);

        if (session.expirado(this.reloj)) {
            resp.status(401)
                .json({
                    'message': 'Sesión expirada'
                });
            return;
        }

        next();
    }
}

import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Session, SessionPayload } from '../../domain/sesiones/entidades/Session';

export default class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    constructor() {}

    use(req: Request, resp: Response, next: NextFunction) {
        const token: string = req.get('authorization') || '';

        const session: Session = new Session(token);
        const payload: SessionPayload = session.getPayload();

        if (payload.exp < Date.now()) {
            resp.status(401)
                .json({
                    'message': 'Sesión expirada'
                });
            return;
        }

        next();
    }
}

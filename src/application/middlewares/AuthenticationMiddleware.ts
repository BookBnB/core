import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { SessionDTO, SessionPayloadDTO } from '../../domain/sesiones/dtos/SessionDTO';

export default class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    constructor() {}

    use(req: Request, resp: Response, next: NextFunction) {
        const token: string = req.get('authorization') || '';

        const session: SessionDTO = new SessionDTO(token);
        const payload: SessionPayloadDTO = session.getPayload();

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

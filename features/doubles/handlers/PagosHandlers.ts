import {rest} from "msw";


export default function pagosCreationHandler() {
    const paymentsUrl = process.env['PAYMENTS_SERVICE_URL']

    return [
        rest.post(`${paymentsUrl}/v1/publicaciones`, (req, res, ctx) => {
            return res(
                ctx.json({})
            )
        }),
        rest.post(`${paymentsUrl}/v1/reservas`, (req, res, ctx) => {
            return res(
                ctx.json({})
            )
        }),
        rest.put(`${paymentsUrl}/v1/reservas/:reservaId/aprobacion`, (req, res, ctx) => {
            return res(
                ctx.json({})
            )
        }),
        rest.post(`${paymentsUrl}/v1/billeteras/:usuarioId`, (req, res, ctx) => {
            return res(
                ctx.json({})
            )
        }),
    ]
}

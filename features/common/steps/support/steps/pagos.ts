import { Given} from "cucumber";
import {rest} from "msw";

const paymentsUrl = process.env['PAYMENTS_SERVICE_URL']

Given('que mi endpoint de creación de billeteras se encuentra activo', function () {
    this.mockServer.use(rest.post(`${paymentsUrl}/v1/billeteras/:usuarioId`, (req, res, ctx) => {
        const { usuarioId } = req.params
        return res(
            ctx.json({
                usuarioId,
                direccion: "0x8b6Fc9476c5329672949bE6Eec5376e71484dEC4"
            })
        )
    }))
});

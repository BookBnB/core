import chai from "chai"
import chaihttp from "chai-http"
import { TableDefinition, Then, When } from "cucumber";
import Reporte from "../../../../src/domain/reportes/entidades/Reporte";
import Reportes from "../Reportes";

chai.use(chaihttp)
const expect = chai.expect;

When('consulto las publicaciones creadas por día entre {string} y {string}', async function (fechaInicio: string, fechaFin: string) {
    await Reportes.publicaciones(this, fechaInicio, fechaFin)
});

When('consulto las reservas creadas por día entre {string} y {string}', async function (fechaInicio: string, fechaFin: string) {
    await Reportes.reservas(this, fechaInicio, fechaFin)
});

When('consulto las reservas activas entre {string} y {string}', async function (fechaInicio: string, fechaFin: string) {
    await Reportes.reservasActivas(this, fechaInicio, fechaFin)
});

type ComparerFn<T> = (a: T, b: T) => boolean

function validarReporte(reporte: Reporte<any>, dataTable: TableDefinition, keyComparer?: ComparerFn<string>, valueComparer?: ComparerFn<any>) {
    const entradasEsperadas = dataTable.hashes()

    expect(reporte.datos).to.have.length(entradasEsperadas.length)

    for (const esperado of entradasEsperadas) {
        const entrada = reporte.datos.find(
            e => keyComparer ?
                    keyComparer(e.clave, esperado.clave) :
                    e.clave === esperado.clave
        )

        expect(entrada, `Entrada con clave ${esperado.clave} no presente en el reporte`).to.be
        expect(
            entrada?.valor,
            `Entrada con clave ${esperado.clave} no tiene el valor esperado`
        ).to.satisfy((valor: any) => valueComparer ? valueComparer(valor, esperado.valor) :
                                                     valor == esperado.valor
        )
    }
}

Then('veo un reporte con:', function (dataTable: TableDefinition) {
    expect(this.last_response).to.have.status(200)
    expect(this.last_response).to.be.json
    validarReporte(
        this.last_response.body,
        dataTable,
        (a: string, b: string) => Date.parse(a) == Date.parse(b),
        (a: any, b: any) => parseInt(a) === parseInt(b)
    )
});

import { expect } from "chai"
import { TableDefinition } from "cucumber"

export function validarObjeto(this: any, dataTable: TableDefinition) {
    Object.entries(dataTable.rowsHash()).forEach(([propiedad, valor]) => {
        expect(this.last_response.body, `Falla validación de propiedad '${propiedad}'`).to.have.nested.property(propiedad).satisfy((prop: any) => prop == valor)
    })
}
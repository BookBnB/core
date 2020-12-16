import { expect } from "chai"
import { TableDefinition } from "cucumber"
import _ from "lodash";

export function validarObjeto(objeto: any, dataTable: TableDefinition) {
    Object.entries(dataTable.rowsHash()).forEach(([propiedad, valor]) => {
        expect(objeto, `Falla validación de propiedad '${propiedad}'`).to.have.nested.property(propiedad).satisfy((prop: any) => prop == valor)
    })
}

export function validarConjunto(this: any, dataTable: TableDefinition) {
    let objetos: any = dataTable.hashes()
    objetos = objetos.map((publicacion: any) => {
        const objetoParseado: any = {}
        Object.entries(publicacion).forEach(([clave, valor]) => {
            _.set(objetoParseado, clave, valor)
        })
        return {...objetoParseado}
    })
    expect(this.last_response.body).to.lengthOf(objetos.length)
    expect(this.last_response.body).to.containSubset(objetos)
}

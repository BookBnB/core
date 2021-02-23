export interface EntradaReporte<T> {
    clave: string
    valor: T
}

export default class Reporte<T> {
    public nombre!: string
    public datos!: EntradaReporte<T>[]
}

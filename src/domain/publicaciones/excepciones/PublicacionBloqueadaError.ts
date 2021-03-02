export default class PublicacionBloqueadaError extends Error {
    constructor(m?: string) {
        super(m || 'Publicación bloqueada');
        Object.setPrototypeOf(this, PublicacionBloqueadaError.prototype);
    }
}

import SesionHandlers from "./SessionHandlers";
import UserHandlers from "./UserHandlers";
import PagosHandlers from "./PagosHandlers";

export function buildHandlers() {
    return [
        ...SesionHandlers(),
        ...UserHandlers(),
        ...PagosHandlers()
    ]
}

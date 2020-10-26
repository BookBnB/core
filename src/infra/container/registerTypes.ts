import {DIContainer} from "@wessberg/di";
import typeOrmConnection from "../typeOrmConnection";
import {Connection, Repository} from "typeorm";
import {IContainer} from "./Container";
import {PublicacionController} from "../../application/PublicacionController";
import {CrearPublicacion} from "../../domain/publicaciones/casos-uso/CrearPublicacion";
import PublicacionRepositorio from "../repositories/PublicacionRepositorio";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";

/**
 * Registra las relaciones entre las abstracciones y las clases
 * concretas.
 * Es obligatorio recibir un DIContainer porque los tipos se resuelven
 * en tiempo de compilación. Si recibimos un IContainer no se compila
 * correctamente. Esto es necesario para cualquier sentencia que
 * registre cualquier relación.
 * @param container
 */
export default async (container: DIContainer): Promise<IContainer> => {
    const connection = await typeOrmConnection()
    container.registerSingleton<Connection>(() => connection)

    // Users
    // await registerUsers(container)

    await registrarPublicaciones(container)

    // Return
    return container
}

// const registerUsers = async (container: DIContainer) => {
//     const user_repo = await container.get<Connection>().getRepository(User);
//     container.registerSingleton<Repository<User>>(() => user_repo)
//     container.registerSingleton<IUserRepository>(() =>
//         new UserRepository(container.get<Repository<User>>()))
//     container.registerSingleton<UserController>()
//     container.registerTransient<GetUsers>()
// }

const registrarPublicaciones = async (container: DIContainer) => {
    container.registerSingleton<PublicacionController>()
    container.registerTransient<CrearPublicacion>()

    const publicacion_repo = await container.get<Connection>().getRepository(Publicacion);
    container.registerSingleton<Repository<Publicacion>>(() => publicacion_repo)
    container.registerSingleton<IPublicacionRepositorio>( () =>
        new PublicacionRepositorio(container.get<Repository<Publicacion>>()))
}

import {DIContainer} from "@wessberg/di";
import typeOrmConnection from "../typeOrmConnection";
import {Connection, Repository} from "typeorm";
import {IContainer} from "./Container";
import {PublicacionController} from "../../application/PublicacionController";
import {CrearPublicacion} from "../../domain/publicaciones/casos-uso/CrearPublicacion";
import PublicacionRepositorio from "../repositories/PublicacionRepositorio";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import {VerPublicacion} from "../../domain/publicaciones/casos-uso/VerPublicacion";
import { SessionController } from "../../application/SessionController";
import { CrearSession } from "../../domain/sesiones/casos-uso/CrearSession";
import UserService from "../servicios/UserService";
import IUserService from "../../domain/sesiones/servicios/UserService";
import JWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IJWTTokenBuilder from "../../domain/sesiones/servicios/JWTTokenBuilder";

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
    await registrarTypeOrmConnection(container);
    await registrarServicios(container);
    await registrarPublicaciones(container);
    await registrarSesiones(container);

    // Return
    return container
}

async function registrarTypeOrmConnection(container: DIContainer) {
    const connection = await typeOrmConnection();
    container.registerSingleton<Connection>(() => connection);
}

const registrarPublicaciones = async (container: DIContainer) => {
    container.registerSingleton<PublicacionController>()
    container.registerTransient<CrearPublicacion>()
    container.registerTransient<VerPublicacion>()

    const publicacion_repo = await container.get<Connection>().getRepository(Publicacion);
    container.registerSingleton<Repository<Publicacion>>(() => publicacion_repo)
    container.registerSingleton<IPublicacionRepositorio>( () =>
        new PublicacionRepositorio(container.get<Repository<Publicacion>>()))
}

const registrarServicios = async (container: DIContainer) => {
    const usersService = new UserService(<string>process.env.USERS_SERVICE_URL);
    container.registerSingleton<IUserService>(() => usersService);

    const tokenBuilder = new JWTTokenBuilder(<string>process.env.SECRET_KEY);
    container.registerSingleton<IJWTTokenBuilder>(() => tokenBuilder)
}

const registrarSesiones = async (container: DIContainer) => {
    container.registerSingleton<SessionController>()
    container.registerSingleton<CrearSession>()
}


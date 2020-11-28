import {DIContainer} from "@wessberg/di";
import typeOrmConnection from "../typeOrmConnection";
import {Connection, EntityManager, Repository} from "typeorm";
import {IContainer} from "./Container";
import {PublicacionController} from "../../application/PublicacionController";
import {CrearPublicacion} from "../../domain/publicaciones/casos-uso/CrearPublicacion";
import PublicacionRepositorio from "../repositories/PublicacionRepositorio";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import {VerPublicacion} from "../../domain/publicaciones/casos-uso/VerPublicacion";
import {SesionController} from "../../application/SesionController";
import {CrearSesion} from "../../domain/sesiones/casos-uso/CrearSesion";
import ServicioUsuarios from "../servicios/ServicioUsuarios";
import IServicioUsuarios from "../../domain/sesiones/servicios/ServicioUsuarios";
import JWTTokenBuilder from "../servicios/JWTTokenBuilder";
import IJWTTokenBuilder from "../../domain/sesiones/servicios/JWTTokenBuilder";
import AuthenticationMiddleware from "../../application/middlewares/AuthenticationMiddleware";
import {BuscarPublicaciones} from "../../domain/publicaciones/casos-uso/BuscarPublicaciones";
import IReloj from "../../domain/common/servicios/Reloj";
import Reloj from "../servicios/Reloj";
import IServicioLugares from "../../domain/lugares/servicios/ServicioLugares";
import ServicioLugares from "../servicios/ServicioLugares";
import {LugarController} from "../../application/LugarController";
import {BuscarDirecciones} from "../../domain/lugares/casos-uso/BuscarDirecciones";
import {ErrorHandler} from "../ErrorHandler";
import JWTTokenVerifier from "../servicios/JWTTokenVerifier";
import IJWTTokenVerifier from "../../domain/sesiones/servicios/JWTTokenVerifier";
import {BuscarCiudades} from "../../domain/lugares/casos-uso/BuscarCiudades";
import { ReservaController } from "../../application/ReservaController";
import { CrearReserva } from "../../domain/reservas/casos-uso/CrearReserva";
import IReservaRepositorio from "../../domain/reservas/repositorios/ReservaRepositorio";
import ReservaRepositorio from "../repositories/ReservaRepositorio";
import Reserva from "../../domain/reservas/entidades/Reserva";
import { UsuarioController } from "../../application/UsuariosController";
import IUsuarioRepositorio from "../../domain/usuarios/repositorios/UsuarioRepositorio";
import UsuarioRepositorio from "../repositories/UsuarioRepositorio";
import {ListarPublicacionesPorAnfitrion} from "../../domain/usuarios/casos-uso/ListarPublicacionesPorAnfitrion";

/**
 * Registra las relaciones entre las abstracciones y las clases
 * concretas.
 * Es obligatorio recibir un DIContainer porque los tipos se resuelven
 * en tiempo de compilación. Si recibimos un IContainer no se compila
 * correctamente. Esto es necesario para cualquier sentencia que
 * registre cualquier relación.
 * @param container
 */
export default class Registry {
    public async registrar(container: DIContainer): Promise<IContainer> {
        await this.registrarTypeOrmConnection(container)
        await this.registrarReloj(container)
        await this.registrarErrorHandler(container)
        await this.registrarPublicaciones(container)
        await this.registrarSesiones(container)
        await this.registrarLugares(container)
        await this.registrarReservas(container)
        await this.registrarUsuarios(container)
        return container
    }

    protected async registrarTypeOrmConnection(container: DIContainer) {
        const connection = await typeOrmConnection();
        container.registerSingleton<Connection>(() => connection);
    }

    protected async registrarErrorHandler(container: DIContainer) {
        container.registerSingleton<ErrorHandler>()
    }

    protected async registrarReloj(container: DIContainer) {
        container.registerSingleton<IReloj>(() => new Reloj());
    }

    protected async registrarPublicaciones(container: DIContainer) {
        container.registerSingleton<PublicacionController>()
        container.registerTransient<CrearPublicacion>()
        container.registerTransient<VerPublicacion>()
        container.registerTransient<BuscarPublicaciones>()

        const publicacion_repo = await container.get<Connection>().getRepository(Publicacion);
        container.registerSingleton<Repository<Publicacion>>(() => publicacion_repo)
        container.registerSingleton<IPublicacionRepositorio>(() =>
            new PublicacionRepositorio(container.get<Repository<Publicacion>>()))
    }

    protected async registrarSesiones(container: DIContainer) {
        const servicioUsuarios = new ServicioUsuarios(<string>process.env.USERS_SERVICE_URL);
        container.registerSingleton<IServicioUsuarios>(() => servicioUsuarios);

        const tokenBuilder = new JWTTokenBuilder(<string>process.env.SECRET_KEY);
        container.registerSingleton<IJWTTokenBuilder>(() => tokenBuilder);

        const tokenVerifier = new JWTTokenVerifier(<string>process.env.SECRET_KEY);
        container.registerSingleton<IJWTTokenVerifier>(() => tokenVerifier);

        container.registerSingleton<SesionController>();
        container.registerTransient<CrearSesion>();

        container.registerSingleton<AuthenticationMiddleware>(() =>
            new AuthenticationMiddleware(
                container.get<IReloj>(),
                container.get<IJWTTokenVerifier>()
            )
        );
    }

    protected async registrarLugares(container: DIContainer) {
        container.registerSingleton<LugarController>();
        container.registerSingleton<IServicioLugares>(() =>
            new ServicioLugares(process.env.ALGOLIA_APPLICATION_ID as string, process.env.ALGOLIA_ADMIN_API_KEY as string))

        container.registerTransient<BuscarDirecciones>();
        container.registerTransient<BuscarCiudades>();
    }

    protected async registrarReservas(container: DIContainer) {
        container.registerSingleton<ReservaController>();
        container.registerTransient<CrearReserva>();

        const reservasRepo: Repository<Reserva> = await container.get<Connection>().getRepository(Reserva);
        container.registerSingleton<Repository<Reserva>>(() => reservasRepo);
        container.registerSingleton<IReservaRepositorio>(() => 
            new ReservaRepositorio(container.get<Repository<Reserva>>()));
    }

    protected async registrarUsuarios(container: DIContainer) {
        container.registerTransient<ListarPublicacionesPorAnfitrion>();
        container.registerSingleton<UsuarioController>();

        const manager: EntityManager = await container.get<Connection>().manager;
        container.registerSingleton<EntityManager>(() => manager);
        container.registerSingleton<IUsuarioRepositorio>(() =>
            new UsuarioRepositorio(manager));
    }
}

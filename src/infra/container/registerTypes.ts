import { DIContainer } from "@wessberg/di";
import { Connection, EntityManager, Repository } from "typeorm";
import { EventoController } from "../../application/EventoController";
import { LugarController } from "../../application/LugarController";
import AuthenticationMiddleware from "../../application/middlewares/AuthenticationMiddleware";
import { PublicacionController } from "../../application/PublicacionController";
import { ReservaController } from "../../application/ReservaController";
import { SesionController } from "../../application/SesionController";
import { UsuarioController } from "../../application/UsuariosController";
import IReloj from "../../domain/common/servicios/Reloj";
import IServicioPagos from "../../domain/common/servicios/ServicioPagos";
import { ConfirmarNuevaPublicacion } from "../../domain/publicaciones/casos-uso/ConfirmarNuevaPublicacion";
import { BuscarCiudades } from "../../domain/lugares/casos-uso/BuscarCiudades";
import { BuscarDirecciones } from "../../domain/lugares/casos-uso/BuscarDirecciones";
import IServicioLugares from "../../domain/lugares/servicios/ServicioLugares";
import { BuscarPublicaciones } from "../../domain/publicaciones/casos-uso/BuscarPublicaciones";
import { CrearPublicacion } from "../../domain/publicaciones/casos-uso/CrearPublicacion";
import { ListarPreguntasDePublicacion } from "../../domain/publicaciones/casos-uso/ListarPreguntasDePublicacion";
import { PreguntarEnPublicacion } from "../../domain/publicaciones/casos-uso/PreguntarEnPublicacion";
import { ResponderEnPublicacion } from "../../domain/publicaciones/casos-uso/ResponderEnPublicacion";
import { VerPublicacion } from "../../domain/publicaciones/casos-uso/VerPublicacion";
import Pregunta from "../../domain/publicaciones/entidades/Pregunta";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import IPreguntaRepositorio from "../../domain/publicaciones/repositorios/PreguntaRepositorio";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import { CrearReserva } from "../../domain/reservas/casos-uso/CrearReserva";
import { ListarReservasDePublicacion } from "../../domain/reservas/casos-uso/ListarReservasDePublicacion";
import { VerReserva } from "../../domain/reservas/casos-uso/VerReserva";
import Reserva from "../../domain/reservas/entidades/Reserva";
import IReservaRepositorio from "../../domain/reservas/repositorios/ReservaRepositorio";
import { CrearSesion } from "../../domain/sesiones/casos-uso/CrearSesion";
import { CrearSesionConGoogle } from "../../domain/sesiones/casos-uso/CrearSesionConGoogle";
import IJWTTokenBuilder from "../../domain/sesiones/servicios/JWTTokenBuilder";
import IJWTTokenVerifier from "../../domain/sesiones/servicios/JWTTokenVerifier";
import IServicioUsuarios from "../../domain/sesiones/servicios/ServicioUsuarios";
import { ListarPublicacionesPorAnfitrion } from "../../domain/usuarios/casos-uso/ListarPublicacionesPorAnfitrion";
import IUsuarioRepositorio from "../../domain/usuarios/repositorios/UsuarioRepositorio";
import { ErrorHandler } from "../ErrorHandler";
import Log4JSLogger, { ILogger } from "../logging/Logger";
import PreguntaRepositorio from "../repositories/PreguntaRepositorio";
import { PublicacionRepositorio } from "../repositories/PublicacionRepositorio";
import ReservaRepositorio from "../repositories/ReservaRepositorio";
import UsuarioRepositorio from "../repositories/UsuarioRepositorio";
import JWTTokenBuilder from "../servicios/JWTTokenBuilder";
import JWTTokenVerifier from "../servicios/JWTTokenVerifier";
import Reloj from "../servicios/Reloj";
import ServicioLugares from "../servicios/ServicioLugares";
import ServicioPagos from "../servicios/ServicioPagos";
import ServicioUsuarios from "../servicios/ServicioUsuarios";
import typeOrmConnection from "../typeOrmConnection";
import { IContainer } from "./Container";
import { ConfirmarNuevaReserva } from "../../domain/reservas/casos-uso/ConfirmarNuevaReserva";
import { ConfirmarAceptacionReserva } from "../../domain/reservas/casos-uso/ConfirmarAceptacionReserva";
import { AprobarReserva } from "../../domain/reservas/casos-uso/AprobarReserva";
import { CrearUsuario } from "../../domain/usuarios/casos-uso/CrearUsuario";
import {RechazarNuevaPublicacion} from "../../domain/publicaciones/casos-uso/RechazarNuevaPublicacion";
import {RechazarReserva} from "../../domain/reservas/casos-uso/RechazarReserva";

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
        await this.registrarLogger(container)
        await this.registrarTypeOrmConnection(container)
        await this.registrarReloj(container)
        await this.registrarErrorHandler(container)
        await this.registrarPublicaciones(container)
        await this.registrarSesiones(container)
        await this.registrarLugares(container)
        await this.registrarReservas(container)
        await this.registrarUsuarios(container)
        await this.registrarEventos(container)
        await this.registrarServicioPagos(container)
        return container
    }

    protected async registrarLogger(container: DIContainer) {
        container.registerSingleton<ILogger>(() => new Log4JSLogger('Api'));
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
        container.registerTransient<PreguntarEnPublicacion>()
        container.registerTransient<ListarPreguntasDePublicacion>()
        container.registerTransient<ResponderEnPublicacion>()
        container.registerSingleton<ListarReservasDePublicacion>()

        const publicacion_repo = await container.get<Connection>().getRepository(Publicacion);
        container.registerSingleton<Repository<Publicacion>>(() => publicacion_repo)
        container.registerSingleton<IPublicacionRepositorio, PublicacionRepositorio>()

        const pregunta_repo = await container.get<Connection>().getRepository(Pregunta);
        container.registerSingleton<Repository<Pregunta>>(() => pregunta_repo)
        container.registerSingleton<IPreguntaRepositorio>(() =>
            new PreguntaRepositorio(container.get<Repository<Pregunta>>()))
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
        container.registerTransient<CrearSesionConGoogle>();
        container.registerTransient<CrearUsuario>();

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
        container.registerTransient<AprobarReserva>();
        container.registerTransient<VerReserva>();

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

    protected async registrarEventos(container: DIContainer) {
        container.registerTransient<ConfirmarNuevaPublicacion>()
        container.registerTransient<RechazarNuevaPublicacion>()
        container.registerTransient<ConfirmarNuevaReserva>()
        container.registerTransient<RechazarReserva>()
        container.registerTransient<ConfirmarAceptacionReserva>()
        container.registerSingleton<EventoController>()
    }

    protected async registrarServicioPagos(container: DIContainer) {
        const servicioPagos = new ServicioPagos(<string>process.env.PAYMENTS_SERVICE_URL);
        container.registerSingleton<IServicioPagos>(() => servicioPagos);
    }
}

import { DIContainer } from "@wessberg/di";
import { Connection, EntityManager, Repository } from "typeorm";
import { IMetricMonitor } from "../../app/metrics/MetricMonitor";
import { PrometheusMonitor } from "../../app/metrics/PrometheusMonitor";
import { EventoController } from "../../application/EventoController";
import { LugarController } from "../../application/LugarController";
import AuthenticationMiddleware from "../../application/middlewares/AuthenticationMiddleware";
import { PublicacionController } from "../../application/PublicacionController";
import { ReportesController } from "../../application/ReportesController";
import { ReservaController } from "../../application/ReservaController";
import { ServidorController } from "../../application/ServidorController";
import { SesionController } from "../../application/SesionController";
import { UsuarioController } from "../../application/UsuariosController";
import IReloj from "../../domain/common/servicios/Reloj";
import IServicioNotificaciones from "../../domain/common/servicios/ServicioNotificaciones";
import IServicioPagos from "../../domain/common/servicios/ServicioPagos";
import { BuscarCiudades } from "../../domain/lugares/casos-uso/BuscarCiudades";
import { BuscarDirecciones } from "../../domain/lugares/casos-uso/BuscarDirecciones";
import IServicioLugares from "../../domain/lugares/servicios/ServicioLugares";
import { BloquearPublicacion } from "../../domain/publicaciones/casos-uso/BloquearPublicacion";
import { BuscarPublicaciones } from "../../domain/publicaciones/casos-uso/BuscarPublicaciones";
import { CalificarPublicacion } from "../../domain/publicaciones/casos-uso/CalificarPublicacion";
import { ConfirmarPublicacionCreada } from "../../domain/publicaciones/casos-uso/ConfirmarPublicacionCreada";
import { ConfirmarRechazoPublicacion } from "../../domain/publicaciones/casos-uso/ConfirmarRechazoPublicacion";
import { CrearPublicacion } from "../../domain/publicaciones/casos-uso/CrearPublicacion";
import { ListarCalificacionesDePublicacion } from "../../domain/publicaciones/casos-uso/ListarCalificacionesDePublicacion";
import { ListarPreguntasDePublicacion } from "../../domain/publicaciones/casos-uso/ListarPreguntasDePublicacion";
import { PreguntarEnPublicacion } from "../../domain/publicaciones/casos-uso/PreguntarEnPublicacion";
import { ResponderEnPublicacion } from "../../domain/publicaciones/casos-uso/ResponderEnPublicacion";
import { VerPublicacion } from "../../domain/publicaciones/casos-uso/VerPublicacion";
import Pregunta from "../../domain/publicaciones/entidades/Pregunta";
import Publicacion from "../../domain/publicaciones/entidades/Publicacion";
import IPreguntaRepositorio from "../../domain/publicaciones/repositorios/PreguntaRepositorio";
import IPublicacionRepositorio from "../../domain/publicaciones/repositorios/PublicacionRepositorio";
import { ReporteCantidadPublicaciones } from "../../domain/reportes/casos-uso/ReporteCantidadPublicaciones";
import { ReporteCantidadReservas } from "../../domain/reportes/casos-uso/ReporteCantidadReservas";
import { ReporteReservasActivas } from "../../domain/reportes/casos-uso/ReporteReservasActivas";
import { AprobarReserva } from "../../domain/reservas/casos-uso/AprobarReserva";
import { CancelarReserva } from "../../domain/reservas/casos-uso/CancelarReserva";
import { ConfirmarAceptacionReserva } from "../../domain/reservas/casos-uso/ConfirmarAceptacionReserva";
import { ConfirmarCancelacionReserva } from "../../domain/reservas/casos-uso/ConfirmarCancelacionReserva";
import { ConfirmarRechazoReserva } from "../../domain/reservas/casos-uso/ConfirmarRechazoReserva";
import { ConfirmarReservaCreada } from "../../domain/reservas/casos-uso/ConfirmarReservaCreada";
import { CrearReserva } from "../../domain/reservas/casos-uso/CrearReserva";
import { ListarReservasDeHuesped } from "../../domain/reservas/casos-uso/ListarReservasDeHuesped";
import { ListarReservasDePublicacion } from "../../domain/reservas/casos-uso/ListarReservasDePublicacion";
import { RechazarReserva } from "../../domain/reservas/casos-uso/RechazarReserva";
import { VerReserva } from "../../domain/reservas/casos-uso/VerReserva";
import Reserva from "../../domain/reservas/entidades/Reserva";
import IReservaRepositorio from "../../domain/reservas/repositorios/ReservaRepositorio";
import { CrearSesion } from "../../domain/sesiones/casos-uso/CrearSesion";
import { CrearSesionConGoogle } from "../../domain/sesiones/casos-uso/CrearSesionConGoogle";
import IJWTTokenBuilder from "../../domain/sesiones/servicios/JWTTokenBuilder";
import IJWTTokenVerifier from "../../domain/sesiones/servicios/JWTTokenVerifier";
import IServicioUsuarios from "../../domain/sesiones/servicios/ServicioUsuarios";
import { CrearUsuario } from "../../domain/usuarios/casos-uso/CrearUsuario";
import { CrearUsuarioConGoogle } from "../../domain/usuarios/casos-uso/CrearUsuarioConGoogle";
import { GuardarDispositivo } from "../../domain/usuarios/casos-uso/GuardarDispositivo";
import { ListarPublicacionesPorAnfitrion } from "../../domain/usuarios/casos-uso/ListarPublicacionesPorAnfitrion";
import Dispositivo from "../../domain/usuarios/entidades/Dispositivo";
import IDispositivoRepositorio from "../../domain/usuarios/repositorios/DispositivoRepositorio";
import IUsuarioRepositorio from "../../domain/usuarios/repositorios/UsuarioRepositorio";
import { ErrorHandler } from "../ErrorHandler";
import Log4JSLogger, { ILogger } from "../logging/Logger";
import DispositivoRepositorio from "../repositories/DispositivoRepositorio";
import PreguntaRepositorio from "../repositories/PreguntaRepositorio";
import { PublicacionRepositorio } from "../repositories/PublicacionRepositorio";
import ReservaRepositorio from "../repositories/ReservaRepositorio";
import UsuarioRepositorio from "../repositories/UsuarioRepositorio";
import JWTTokenBuilder from "../servicios/JWTTokenBuilder";
import JWTTokenVerifier from "../servicios/JWTTokenVerifier";
import Reloj from "../servicios/Reloj";
import ServicioLugares from "../servicios/ServicioLugares";
import ServicioNotificaciones from "../servicios/ServicioNotificaciones";
import ServicioPagos from "../servicios/ServicioPagos";
import ServicioUsuarios from "../servicios/ServicioUsuarios";
import typeOrmConnection from "../typeOrmConnection";
import { IContainer } from "./Container";

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
        await this.registrarMetricas(container)
        await this.registrarPagos(container)
        await this.registrarReportes(container)
        await this.registrarDispositivos(container)
        return container
    }

    protected async registrarLogger(container: DIContainer) {
        container.registerSingleton<ILogger>(() => new Log4JSLogger('App'));
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
        container.registerTransient<CalificarPublicacion>();
        container.registerTransient<ListarCalificacionesDePublicacion>();
        container.registerTransient<BloquearPublicacion>();

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
        container.registerTransient<CrearUsuarioConGoogle>();

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
        container.registerTransient<RechazarReserva>();
        container.registerTransient<VerReserva>();
        container.registerTransient<ListarReservasDeHuesped>();
        container.registerTransient<CancelarReserva>();

        const reservasRepo: Repository<Reserva> = await container.get<Connection>().getRepository(Reserva);
        container.registerSingleton<Repository<Reserva>>(() => reservasRepo);
        container.registerSingleton<IReservaRepositorio>(() =>
            new ReservaRepositorio(container.get<Repository<Reserva>>()));
    }

    protected async registrarUsuarios(container: DIContainer) {
        container.registerSingleton<UsuarioController>();
        container.registerTransient<ListarPublicacionesPorAnfitrion>();

        const manager: EntityManager = await container.get<Connection>().manager;
        container.registerSingleton<EntityManager>(() => manager);
        container.registerSingleton<IUsuarioRepositorio>(() =>
            new UsuarioRepositorio(manager));
    }

    protected async registrarEventos(container: DIContainer) {
        container.registerTransient<ConfirmarPublicacionCreada>()
        container.registerTransient<ConfirmarRechazoPublicacion>()
        container.registerTransient<ConfirmarReservaCreada>()
        container.registerTransient<ConfirmarRechazoReserva>()
        container.registerTransient<ConfirmarAceptacionReserva>()
        container.registerTransient<ConfirmarCancelacionReserva>()
        container.registerSingleton<EventoController>()
    }

    protected async registrarServicioPagos(container: DIContainer) {
        const servicioPagos = new ServicioPagos(<string>process.env.PAYMENTS_SERVICE_URL);
        container.registerSingleton<IServicioPagos>(() => servicioPagos);
    }

    protected async registrarMetricas(container: DIContainer) {
        container.registerSingleton<IMetricMonitor>(() => new PrometheusMonitor())
    }

    protected async registrarPagos(container: DIContainer) {
        container.registerSingleton<ServidorController>()
    }

    protected async registrarReportes(container: DIContainer) {
        container.registerTransient<ReporteCantidadPublicaciones>()
        container.registerTransient<ReporteCantidadReservas>()
        container.registerTransient<ReporteReservasActivas>()
        container.registerSingleton<ReportesController>()
    }

    protected async registrarDispositivos(container: DIContainer) {
        container.registerTransient<GuardarDispositivo>();
        container.registerSingleton<IServicioNotificaciones>(() => new ServicioNotificaciones());

        const dispositivosRepo: Repository<Dispositivo> = await container.get<Connection>().getRepository(Dispositivo);
        container.registerSingleton<Repository<Dispositivo>>(() => dispositivosRepo);
        container.registerSingleton<IDispositivoRepositorio>(() =>
            new DispositivoRepositorio(container.get<Repository<Dispositivo>>()));
    }
}

import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "../../usuarios/entidades/Usuario";
import Direccion, {DireccionConstructor} from "../../lugares/entidades/Direccion";
import Imagen from "./Imagen";
import Reserva from "../../reservas/entidades/Reserva";
import Pregunta from "./Pregunta";
import PreguntaInexistenteError from "../excepciones/PreguntaInexistenteError";
import {CrearReservaDTO} from "../../reservas/casos-uso/CrearReserva";
import EstadoDePublicacion from "./estados-publicacion/EstadoDePublicacion";
import Creada from "./estados-publicacion/Creada";
import PendienteDeCreacion from "./estados-publicacion/PendienteDeCreacion";
import Rechazada from "./estados-publicacion/Rechazada";
import EstadoPublicacionTransformer from "./estados-publicacion/EstadoPublicacionTransformer";
import CalificacionDePublicacion from "./CalificacionDePublicacion";
import {CalificarPublicacionDTO} from "../casos-uso/CalificarPublicacion";

export interface PublicacionConstructor {
    titulo: string
    descripcion: string
    precioPorNoche: number
    direccion: DireccionConstructor
    cantidadDeHuespedes: number
    anfitrion: Usuario,
    imagenes: Imagen[]
    bloqueada?: boolean
}

export enum EstadoPublicacion {
    PENDIENTE_DE_CREACION = 'Pendiente de creación',
    CREADA = 'Creada',
    RECHAZADA = 'Rechazada'
}

export enum TipoDeAlojamiento {
    alojamientoEntero = 'Alojamiento entero',
    habitacionPrivada = 'Habitación privada',
    habitacionCompartida = 'Habitación compartida',
    habitacionDeHotel = 'Habitación de hotel'
}

@Entity()
export default class Publicacion {
    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column('int', {nullable: true})
    public contratoId?: number;

    @Column("text", {transformer: new EstadoPublicacionTransformer()})
    public estado!: EstadoDePublicacion;

    @Column()
    public titulo!: string;

    @Column("text")
    public descripcion!: string;

    @Column("float")
    public precioPorNoche!: number;

    @Column(type => Direccion)
    public direccion!: Direccion;

    @Column("int")
    public cantidadDeHuespedes!: number;

    @Column({type: 'enum', enum: TipoDeAlojamiento})
    public tipoDeAlojamiento!: TipoDeAlojamiento;

    @Column(type => Usuario)
    public anfitrion!: Usuario;

    @OneToMany(type => Imagen, imagen => imagen.publicacion, {cascade: true, eager: true})
    public imagenes!: Imagen[];

    @OneToMany(type => Reserva, reserva => reserva.publicacion)
    public reservas!: Reserva[];

    @OneToMany(type => Pregunta, pregunta => pregunta.publicacion, {cascade: true})
    public preguntas!: Promise<Pregunta[]>;

    @OneToMany(type => CalificacionDePublicacion, calificacion => calificacion.publicacion, {
        cascade: true,
        eager: true
    })
    public calificaciones!: CalificacionDePublicacion[];

    @CreateDateColumn()
    public fechaCreacion?: Date

    @Column('bool', { default: false })
    public bloqueada: boolean = false;

    constructor(args: PublicacionConstructor) {
        Object.assign(this, args)
        this.estado = new PendienteDeCreacion()
    }

    async preguntar(usuario: Usuario, descripcion: string): Promise<Pregunta> {
        return new Pregunta({usuario, descripcion, publicacion: this})
    }

    async responder(idPregunta: string, descripcion: string, usuario: Usuario): Promise<Pregunta> {
        const pregunta = (await this.preguntas).find(pregunta => pregunta.id === idPregunta)
        if (!pregunta) throw new PreguntaInexistenteError(`La pregunta con id ${idPregunta} no existe.`)
        pregunta.responder(descripcion, usuario)
        return pregunta
    }

    confirmar(contratoId: number) {
        this.estado = new Creada()
        this.contratoId = contratoId
    }

    rechazar() {
        this.estado = new Rechazada()
    }

    esValida(): boolean {
        return this.estado.esValida()
    }

    perteneceA(usuario: Usuario) {
        return this.anfitrion.esIgualA(usuario);
    }

    crearReserva(huesped: Usuario, body: CrearReservaDTO): Reserva {
        this.estado.crearReserva(huesped, body, this)

        return new Reserva({
            fechaInicio: body.fechaInicio,
            fechaFin: body.fechaFin,
            precioPorNoche: this.precioPorNoche,
            publicacion: this,
            huesped,
        });
    }

    getReservas(): Reserva[] {
        return this.reservas
    }

    calificar(huesped: Usuario, calificacion: CalificarPublicacionDTO): CalificacionDePublicacion {
        const nuevaCalificacion = new CalificacionDePublicacion({
            puntos: calificacion.puntos,
            detalle: calificacion.detalle,
            huesped,
            publicacion: this
        })
        this.calificaciones.push(nuevaCalificacion)
        return nuevaCalificacion
    }

    calificacion(): number {
        const calificaciones = this.calificaciones || []
        return calificaciones
            .map(calificacion => calificacion.puntos)
            .reduce((p, c) => p + c, 0) / calificaciones.length
    }

    bloquear() {
        this.bloqueada = true
    }

    desbloquear() {
        this.bloqueada = false
    }

    bloqueadaPara(usuario: Usuario) {
        return this.bloqueada && !usuario.tieneRol('admin')
    }
}

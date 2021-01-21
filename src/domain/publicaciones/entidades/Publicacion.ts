import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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

export interface PublicacionConstructor {
    titulo: string
    descripcion: string
    precioPorNoche: number
    direccion: DireccionConstructor
    cantidadDeHuespedes: number
    anfitrion: Usuario,
    imagenes: Imagen[]
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

    constructor(args: PublicacionConstructor) {
        Object.assign(this, args);
        // this.estado = EstadoPublicacion.pendienteCreacion
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

    confirmar() {
        this.estado = new Creada()
    }

    setContratoId(contratoId: number) {
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
}

import chai from "chai";
import { When } from "cucumber";
import { TipoEvento } from "../../../../src/application/EventoController";
import Eventos from "../Eventos";

const expect = chai.expect;

When('se notifica un evento para la publicacion creada', async function () {
    const evento = {
        tipo: TipoEvento.NUEVA_PUBLICACION,
        payload: {
            direccionAnfitrion: '0x0123456789012345678901234567890123456789',
            idPublicacion: this.last_publicacion.body.id,
            contratoId: 1,
            precioPorNoche: 1
        }
    }

    await Eventos.crear(this, evento)

    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
});

When('se notifica un evento para la reserva creada', async function () {
    const evento = {
        tipo: TipoEvento.NUEVA_RESERVA,
        payload: {
            idReserva: this.last_reserva.body.id,
            fechaInicio: this.last_reserva.body.fechaInicio,
            fechaFin: this.last_reserva.body.fechaFin
        }
    }

    await Eventos.crear(this, evento)

    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
});

When('se notifica un evento de aprobacion para la reserva', async function () {
    const evento = {
        tipo: TipoEvento.RESERVA_ACEPTADA,
        payload: {
            idReserva: this.last_reserva.body.id,
            fechaInicio: this.last_reserva.body.fechaInicio,
            fechaFin: this.last_reserva.body.fechaFin
        }
    }

    await Eventos.crear(this, evento)

    expect(this.last_response).to.have.status(201)
    expect(this.last_response).to.be.json
});

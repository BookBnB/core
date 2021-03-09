import {expect} from "chai";
import {describe, it} from "mocha";
import Reserva from "../../../src/domain/reservas/entidades/Reserva";
import ReservaBuilder from "./ReservaBuilder";

describe("Reserva", () => {
    describe("Solapamiento", () => {
        it("se solapa en las mismas fechas", () => {
            const reserva = ReservaBuilder.crear()
                .conFechaInicio(new Date('2020-12-01'))
                .conFechaFin(new Date('2020-12-05'))
                .build()

            expect(reserva.solapada(reserva)).to.be.true
        });

        [
            ['2020-12-01', '2020-12-05', '2020-12-02', '2020-12-04'],
            ['2020-12-01', '2020-12-05', '2020-12-01', '2020-12-04']
        ].forEach(([fechaInicio1, fechaFin1, fechaInicio2, fechaFin2]) => {
            it("se solapa en fechas incluidas en la otra", () => {
                const reserva1 = ReservaBuilder.crear()
                    .conFechaInicio(new Date(fechaInicio1))
                    .conFechaFin(new Date(fechaFin1))
                    .build()

                const reserva2 = ReservaBuilder.crear()
                    .conFechaInicio(new Date(fechaInicio2))
                    .conFechaFin(new Date(fechaFin2))
                    .build()

                expect(reserva1.solapada(reserva2)).to.be.true
                expect(reserva2.solapada(reserva1)).to.be.true
            });
        })

        it("no se solapa en fechas disjuntas", () => {
            const reserva1 = ReservaBuilder.crear()
                .conFechaInicio(new Date('2020-12-01'))
                .conFechaFin(new Date('2020-12-05'))
                .build()

            const reserva2 = ReservaBuilder.crear()
                .conFechaInicio(new Date('2020-12-06'))
                .conFechaFin(new Date('2020-12-10'))
                .build()

            expect(reserva1.solapada(reserva2)).to.be.false
            expect(reserva2.solapada(reserva1)).to.be.false
        });

        it("no se solapa si coincide la fecha de checkin con la de checkout", () => {
            const reserva1 = ReservaBuilder.crear()
                .conFechaInicio(new Date('2020-12-01'))
                .conFechaFin(new Date('2020-12-05'))
                .build()

            const reserva2 = ReservaBuilder.crear()
                .conFechaInicio(new Date('2020-12-05'))
                .conFechaFin(new Date('2020-12-10'))
                .build()

            expect(reserva1.solapada(reserva2)).to.be.false
            expect(reserva2.solapada(reserva1)).to.be.false
        });

        it("se solapa si coincide un solo día", () => {
            const reserva1 = ReservaBuilder.crear()
                .conFechaInicio(new Date('2020-12-01'))
                .conFechaFin(new Date('2020-12-05'))
                .build()

            const reserva2 = ReservaBuilder.crear()
                .conFechaInicio(new Date('2020-12-04'))
                .conFechaFin(new Date('2020-12-10'))
                .build()

            expect(reserva1.solapada(reserva2)).to.be.true
            expect(reserva2.solapada(reserva1)).to.be.true
        });
    });
});

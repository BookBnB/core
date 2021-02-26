import {MigrationInterface, QueryRunner} from "typeorm";

export class FechaCreacionReserva1614315477561 implements MigrationInterface {
    name = 'FechaCreacionReserva1614315477561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ADD "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "fechaCreacion"`);
    }

}

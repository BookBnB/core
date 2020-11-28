import {MigrationInterface, QueryRunner} from "typeorm";

export class IdReserva1605763773185 implements MigrationInterface {
    name = 'IdReserva1605763773185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "reserva"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "PK_37909c9a3ea6a72ee6f21b16129"`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "id" TYPE character varying(6)`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "PK_37909c9a3ea6a72ee6f21b16129" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "reserva"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "PK_37909c9a3ea6a72ee6f21b16129"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "PK_37909c9a3ea6a72ee6f21b16129" PRIMARY KEY ("id")`);
    }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class CrearReserva1605027434662 implements MigrationInterface {
    name = 'CrearReserva1605027434662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reserva" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fechaInicio" date NOT NULL, "fechaFin" date NOT NULL, "estado" text NOT NULL, "publicacionId" uuid, "huespedEmail" character varying NOT NULL, CONSTRAINT "PK_37909c9a3ea6a72ee6f21b16129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "FK_8b9420a4ae8db031446b2d8bb6f" FOREIGN KEY ("publicacionId") REFERENCES "publicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "FK_8b9420a4ae8db031446b2d8bb6f"`);
        await queryRunner.query(`DROP TABLE "reserva"`);
    }

}

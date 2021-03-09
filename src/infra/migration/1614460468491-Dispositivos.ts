import {MigrationInterface, QueryRunner} from "typeorm";

export class Dispositivos1614460468491 implements MigrationInterface {
    name = 'Dispositivos1614460468491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dispositivo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "usuarioId" uuid NOT NULL, CONSTRAINT "PK_86bfbecafb42ad256f14c64e38c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dispositivo"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class Calificaciones1613767413116 implements MigrationInterface {
    name = 'Calificaciones1613767413116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calificacion_de_publicacion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "puntos" integer NOT NULL, "detalle" text, "publicacionId" uuid, "huespedId" uuid NOT NULL, CONSTRAINT "PK_03ffd214c6a36cb5dd2a2749dfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calificacion_de_publicacion" ADD CONSTRAINT "FK_bf94738d4dd8806a3e0bc1b79e3" FOREIGN KEY ("publicacionId") REFERENCES "publicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calificacion_de_publicacion" DROP CONSTRAINT "FK_bf94738d4dd8806a3e0bc1b79e3"`);
        await queryRunner.query(`DROP TABLE "calificacion_de_publicacion"`);
    }

}

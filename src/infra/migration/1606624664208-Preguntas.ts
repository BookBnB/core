import {MigrationInterface, QueryRunner} from "typeorm";

export class Preguntas1606624664208 implements MigrationInterface {
    name = 'Preguntas1606624664208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pregunta" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creada" TIMESTAMP NOT NULL, "pregunta" text NOT NULL, "publicacionId" uuid, "usuarioId" uuid NOT NULL, CONSTRAINT "PK_90682da4e7c7f84a4ed457589fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pregunta" ADD CONSTRAINT "FK_767c2d94a4f30f139e94f9d5b73" FOREIGN KEY ("publicacionId") REFERENCES "publicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pregunta" DROP CONSTRAINT "FK_767c2d94a4f30f139e94f9d5b73"`);
        await queryRunner.query(`DROP TABLE "pregunta"`);
    }

}

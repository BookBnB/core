import {MigrationInterface, QueryRunner} from "typeorm";

export class Respuesta1606685047105 implements MigrationInterface {
    name = 'Respuesta1606685047105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pregunta" RENAME COLUMN "pregunta" TO "descripcion"`);
        await queryRunner.query(`CREATE TABLE "respuesta" ("creada" TIMESTAMP NOT NULL, "descripcion" text NOT NULL, "preguntaId" uuid NOT NULL, "usuarioId" uuid NOT NULL, CONSTRAINT "REL_92e47895593ddd4418957fd3f1" UNIQUE ("preguntaId"), CONSTRAINT "PK_92e47895593ddd4418957fd3f14" PRIMARY KEY ("preguntaId"))`);
        await queryRunner.query(`ALTER TABLE "respuesta" ADD CONSTRAINT "FK_92e47895593ddd4418957fd3f14" FOREIGN KEY ("preguntaId") REFERENCES "pregunta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "respuesta" DROP CONSTRAINT "FK_92e47895593ddd4418957fd3f14"`);
        await queryRunner.query(`DROP TABLE "respuesta"`);
        await queryRunner.query(`ALTER TABLE "pregunta" RENAME COLUMN "descripcion" TO "pregunta"`);
    }

}

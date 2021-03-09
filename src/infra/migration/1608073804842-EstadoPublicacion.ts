import {MigrationInterface, QueryRunner} from "typeorm";

export class EstadoPublicacion1608073804842 implements MigrationInterface {
    name = 'EstadoPublicacion1608073804842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "publicacion_estado_enum" AS ENUM('Pendiente de creación', 'Creada')`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "estado" "publicacion_estado_enum" NOT NULL DEFAULT 'Pendiente de creación'`);
        await queryRunner.query(`ALTER TABLE "respuesta" DROP CONSTRAINT "FK_92e47895593ddd4418957fd3f14"`);
        await queryRunner.query(`COMMENT ON COLUMN "respuesta"."preguntaId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "respuesta" ADD CONSTRAINT "UQ_92e47895593ddd4418957fd3f14" UNIQUE ("preguntaId")`);
        await queryRunner.query(`ALTER TABLE "respuesta" ADD CONSTRAINT "FK_92e47895593ddd4418957fd3f14" FOREIGN KEY ("preguntaId") REFERENCES "pregunta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "respuesta" DROP CONSTRAINT "FK_92e47895593ddd4418957fd3f14"`);
        await queryRunner.query(`ALTER TABLE "respuesta" DROP CONSTRAINT "UQ_92e47895593ddd4418957fd3f14"`);
        await queryRunner.query(`COMMENT ON COLUMN "respuesta"."preguntaId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "respuesta" ADD CONSTRAINT "FK_92e47895593ddd4418957fd3f14" FOREIGN KEY ("preguntaId") REFERENCES "pregunta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "estado"`);
        await queryRunner.query(`DROP TYPE "publicacion_estado_enum"`);
    }

}

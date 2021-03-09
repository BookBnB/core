import {MigrationInterface, QueryRunner} from "typeorm";

export class RefactorEstadosPublicacion1611191902078 implements MigrationInterface {
    name = 'RefactorEstadosPublicacion1611191902078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" ALTER COLUMN "estado" TYPE text`);
        await queryRunner.query(`ALTER TABLE "publicacion" ALTER COLUMN "estado" DROP DEFAULT`);
        await queryRunner.query(`DROP TYPE "public"."publicacion_estado_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."publicacion_estado_enum" AS ENUM('Pendiente de creación', 'Creada', 'Rechazada')`);
        await queryRunner.query(`ALTER TABLE "publicacion" ALTER COLUMN "estado" TYPE "publicacion_estado_enum" USING estado::publicacion_estado_enum`);
        await queryRunner.query(`ALTER TABLE "publicacion" ALTER COLUMN "estado" SET DEFAULT 'Pendiente de creación'`);
    }

}

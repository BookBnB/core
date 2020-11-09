import {MigrationInterface, QueryRunner} from "typeorm";

export class AnfitrionPublicacionCambioNombre1604888405537 implements MigrationInterface {
    name = 'AnfitrionPublicacionCambioNombre1604888405537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "anfitrionId"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "anfitrionEmail" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "anfitrionEmail"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "anfitrionId" text NOT NULL`);
    }

}

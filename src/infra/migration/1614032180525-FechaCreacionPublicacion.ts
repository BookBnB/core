import {MigrationInterface, QueryRunner} from "typeorm";

export class FechaCreacionPublicacion1614032180525 implements MigrationInterface {
    name = 'FechaCreacionPublicacion1614032180525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "fechaCreacion"`);
    }

}

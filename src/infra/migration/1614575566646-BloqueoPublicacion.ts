import {MigrationInterface, QueryRunner} from "typeorm";

export class BloqueoPublicacion1614575566646 implements MigrationInterface {
    name = 'BloqueoPublicacion1614575566646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "bloqueada" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "bloqueada"`);
    }

}

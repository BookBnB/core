import {MigrationInterface, QueryRunner} from "typeorm";

export class ContratoIdPublicacion1608100312989 implements MigrationInterface {
    name = 'ContratoIdPublicacion1608100312989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "contratoId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "contratoId"`);
    }

}

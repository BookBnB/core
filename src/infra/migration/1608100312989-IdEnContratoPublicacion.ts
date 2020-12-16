import {MigrationInterface, QueryRunner} from "typeorm";

export class IdEnContratoPublicacion1608100312989 implements MigrationInterface {
    name = 'IdEnContratoPublicacion1608100312989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "idEnContrato" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "idEnContrato"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class IdUsuario1605330397506 implements MigrationInterface {
    name = 'IdUsuario1605330397506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" RENAME COLUMN "huespedEmail" TO "huespedId"`);
        await queryRunner.query(`ALTER TABLE "publicacion" RENAME COLUMN "anfitrionEmail" TO "anfitrionId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" RENAME COLUMN "anfitrionId" TO "anfitrionEmail"`);
        await queryRunner.query(`ALTER TABLE "reserva" RENAME COLUMN "huespedId" TO "huespedEmail"`);
    }

}

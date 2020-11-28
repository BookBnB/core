import {MigrationInterface, QueryRunner} from "typeorm";

export class Usuarios1606284497879 implements MigrationInterface {
    name = 'Usuarios1606284497879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "imagen"`);
        await queryRunner.query(`DELETE FROM "reserva"`);
        await queryRunner.query(`DELETE FROM "publicacion"`);

        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "huespedId"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "huespedId" uuid`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "anfitrionId"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "anfitrionId" uuid`);

        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "huespedId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publicacion" ALTER COLUMN "anfitrionId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "imagen"`);
        await queryRunner.query(`DELETE FROM "reserva"`);
        await queryRunner.query(`DELETE FROM "publicacion"`);

        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "anfitrionId"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "anfitrionId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "huespedId"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "huespedId" character varying NOT NULL`);

        await queryRunner.query(`ALTER TABLE "publicacion" ALTER COLUMN "anfitrionId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "huespedId" DROP NOT NULL`);
    }

}

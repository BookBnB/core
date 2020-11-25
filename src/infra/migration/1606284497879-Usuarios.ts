import {MigrationInterface, QueryRunner} from "typeorm";

export class Usuarios1606284497879 implements MigrationInterface {
    name = 'Usuarios1606284497879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "imagen"`);
        await queryRunner.query(`DELETE FROM "reserva"`);
        await queryRunner.query(`DELETE FROM "publicacion"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "huespedId"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "huespedId" uuid`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "anfitrionId"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "anfitrionId" uuid`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "FK_de0dbd8679369ace2467740025f" FOREIGN KEY ("huespedId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD CONSTRAINT "FK_e07e5da5d3e02303d71792510bc" FOREIGN KEY ("anfitrionId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP CONSTRAINT "FK_e07e5da5d3e02303d71792510bc"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "FK_de0dbd8679369ace2467740025f"`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "anfitrionId"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "anfitrionId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "huespedId"`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD "huespedId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}

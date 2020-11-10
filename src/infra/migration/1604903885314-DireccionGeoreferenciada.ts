import {MigrationInterface, QueryRunner} from "typeorm";

export class DireccionGeoreferenciada1604903885314 implements MigrationInterface {
    name = 'DireccionGeoreferenciada1604903885314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionCalle"`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionNumero"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionPais" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionProvincia" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionCoordenadas" geometry(Point,4326) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionCiudad" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionMunicipio" character varying`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionDireccion" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP EXTENSION IF EXISTS postgis`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionDireccion"`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionMunicipio"`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionCiudad"`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionCoordenadas"`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionProvincia"`);
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "direccionPais"`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionNumero" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "direccionCalle" character varying NOT NULL`);
    }

}

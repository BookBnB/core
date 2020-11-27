import {MigrationInterface, QueryRunner} from "typeorm";

export class TipoDeAlojamiento1606448125698 implements MigrationInterface {
    name = 'TipoDeAlojamiento1606448125698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "publicacion_tipodealojamiento_enum" AS ENUM('Alojamiento entero', 'Habitación privada', 'Habitación compartida', 'Habitación de hotel')`);
        await queryRunner.query(`ALTER TABLE "publicacion" ADD "tipoDeAlojamiento" "publicacion_tipodealojamiento_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publicacion" DROP COLUMN "tipoDeAlojamiento"`);
        await queryRunner.query(`DROP TYPE "publicacion_tipodealojamiento_enum"`);
    }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class PrecioPorNocheFloat1605749528867 implements MigrationInterface {
    name = 'PrecioPorNocheFloat1605749528867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "precioPorNoche" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ALTER COLUMN "precioPorNoche" TYPE integer`);
    }
}

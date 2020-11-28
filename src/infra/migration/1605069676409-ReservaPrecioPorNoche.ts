import {MigrationInterface, QueryRunner} from "typeorm";

export class ReservaPrecioPorNoche1605069676409 implements MigrationInterface {
    name = 'ReservaPrecioPorNoche1605069676409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ADD "precioPorNoche" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "precioPorNoche"`);
    }

}

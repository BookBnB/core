import {MigrationInterface, QueryRunner} from "typeorm";

export class Imagenes1604994509644 implements MigrationInterface {
    name = 'Imagenes1604994509644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "imagen" ("url" text NOT NULL, "publicacionId" uuid, CONSTRAINT "PK_300568b09bf7eeab49e965f15b9" PRIMARY KEY ("url"))`);
        await queryRunner.query(`ALTER TABLE "imagen" ADD CONSTRAINT "FK_5b679d69c408af8fd2a4d0a2dd2" FOREIGN KEY ("publicacionId") REFERENCES "publicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagen" DROP CONSTRAINT "FK_5b679d69c408af8fd2a4d0a2dd2"`);
        await queryRunner.query(`DROP TABLE "imagen"`);
    }

}

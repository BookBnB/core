import {MigrationInterface, QueryRunner} from "typeorm";

export class CrearPublicacion1603743336652 implements MigrationInterface {
    name = 'CrearPublicacion1603743336652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "publicacion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "descripcion" text NOT NULL, "precioPorNoche" double precision NOT NULL, "cantidadDeHuespedes" integer NOT NULL, "direccionCalle" character varying NOT NULL, "direccionNumero" integer NOT NULL, CONSTRAINT "PK_c14e747a7cc735a880bfbf58a70" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "publicacion"`);
    }

}

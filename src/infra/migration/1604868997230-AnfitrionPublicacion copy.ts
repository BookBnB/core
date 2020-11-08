import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AnfitrionPublicacion1604868997230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("publicacion", new TableColumn({
            name: "anfitrionId",
            type: "text",
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("publicacion", "anfitrionId");
    }

}

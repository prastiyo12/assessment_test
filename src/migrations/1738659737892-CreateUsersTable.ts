import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1738659737892 implements MigrationInterface {
    name = 'CreateUsersTable1738659737892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`birthdate\` date NOT NULL, \`timezone\` varchar(255) NOT NULL, \`status\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}

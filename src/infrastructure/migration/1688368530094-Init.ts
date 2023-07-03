import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1688368530094 implements MigrationInterface {
    name = 'Init1688368530094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_307e2a3e2d3facaa0af943b68eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_7d6bfa71f4d6a1fa0af1f688327" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_model_roles_role_model" ("userModelId" uuid NOT NULL, "roleModelId" uuid NOT NULL, CONSTRAINT "PK_660e81cb4a3aed76400f874bb8b" PRIMARY KEY ("userModelId", "roleModelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2f5001771fdc35fc587643a245" ON "user_model_roles_role_model" ("userModelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a44c291cbf2e8982ed111fa6cd" ON "user_model_roles_role_model" ("roleModelId") `);
        await queryRunner.query(`ALTER TABLE "user_model_roles_role_model" ADD CONSTRAINT "FK_2f5001771fdc35fc587643a245e" FOREIGN KEY ("userModelId") REFERENCES "user_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_model_roles_role_model" ADD CONSTRAINT "FK_a44c291cbf2e8982ed111fa6cda" FOREIGN KEY ("roleModelId") REFERENCES "role_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_model_roles_role_model" DROP CONSTRAINT "FK_a44c291cbf2e8982ed111fa6cda"`);
        await queryRunner.query(`ALTER TABLE "user_model_roles_role_model" DROP CONSTRAINT "FK_2f5001771fdc35fc587643a245e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a44c291cbf2e8982ed111fa6cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f5001771fdc35fc587643a245"`);
        await queryRunner.query(`DROP TABLE "user_model_roles_role_model"`);
        await queryRunner.query(`DROP TABLE "user_model"`);
        await queryRunner.query(`DROP TABLE "role_model"`);
    }

}

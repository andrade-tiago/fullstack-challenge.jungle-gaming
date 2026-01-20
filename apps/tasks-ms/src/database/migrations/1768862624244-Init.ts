import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1768862624244 implements MigrationInterface {
    name = 'Init1768862624244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "comment_content" character varying(255) NOT NULL, "taskId" uuid, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "task_users" ("task_user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_id" uuid NOT NULL, "user_id" uuid NOT NULL, "taskId" uuid, CONSTRAINT "PK_752292ee4b55418d00502e58791" PRIMARY KEY ("task_user_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_76dc5127b986d0b6712b811aea" ON "task_users" ("task_id", "user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT')`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("task_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_title" character varying(100) NOT NULL, "task_description" character varying(255) NOT NULL, "task_deadline" TIMESTAMP NOT NULL, "task_priority" "public"."task_priority_enum" NOT NULL, "task_status" "public"."task_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3feca00d238e5cf50185fab8d46" PRIMARY KEY ("task_id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_users" ADD CONSTRAINT "FK_b429ec397e51e417df01f3122f0" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_users" DROP CONSTRAINT "FK_b429ec397e51e417df01f3122f0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76dc5127b986d0b6712b811aea"`);
        await queryRunner.query(`DROP TABLE "task_users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}

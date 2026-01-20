import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTaskAssignments1768874057570 implements MigrationInterface {
    name = 'UpdateTaskAssignments1768874057570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_assignments" ("task_assignment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_id" uuid NOT NULL, "user_id" uuid NOT NULL, "assignedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2f1f822596c4af9491d12ff0cbd" UNIQUE ("task_id", "user_id"), CONSTRAINT "PK_cdf3bcebb18064d6c7136b2eb22" PRIMARY KEY ("task_assignment_id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task_assignments" ADD CONSTRAINT "FK_b389f4488d0a8241c3c98273966" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_assignments" DROP CONSTRAINT "FK_b389f4488d0a8241c3c98273966"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updated_at"`);
        await queryRunner.query(`DROP TABLE "task_assignments"`);
    }

}

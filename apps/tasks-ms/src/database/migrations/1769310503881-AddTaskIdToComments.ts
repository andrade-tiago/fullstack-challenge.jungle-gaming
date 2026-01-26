import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskIdToComments1769310503881 implements MigrationInterface {
    name = 'AddTaskIdToComments1769310503881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`ALTER TABLE "task_assignments" RENAME COLUMN "assignedAt" TO "created_at"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "taskId"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "task_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_18c2493067c11f44efb35ca0e03" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_18c2493067c11f44efb35ca0e03"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "task_id"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "taskId" uuid`);
        await queryRunner.query(`ALTER TABLE "task_assignments" RENAME COLUMN "created_at" TO "assignedAt"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

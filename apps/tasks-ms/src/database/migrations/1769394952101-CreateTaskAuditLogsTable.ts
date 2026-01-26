import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskAuditLogsTable1769394952101 implements MigrationInterface {
    name = 'CreateTaskAuditLogsTable1769394952101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_audit_logs_log_action_enum" AS ENUM('CREATED', 'UPDATE', 'DELETE')`);
        await queryRunner.query(`CREATE TABLE "task_audit_logs" ("log_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_id" uuid NOT NULL, "log_action" "public"."task_audit_logs_log_action_enum" NOT NULL, "log_metadata" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a47b4b526de5f271fcea703e70" PRIMARY KEY ("log_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task_audit_logs"`);
        await queryRunner.query(`DROP TYPE "public"."task_audit_logs_log_action_enum"`);
    }

}

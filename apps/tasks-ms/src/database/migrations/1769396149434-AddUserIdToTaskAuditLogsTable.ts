import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToTaskAuditLogsTable1769396149434 implements MigrationInterface {
    name = 'AddUserIdToTaskAuditLogsTable1769396149434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_audit_logs" ADD "user_id" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_audit_logs" DROP COLUMN "user_id"`);
    }

}

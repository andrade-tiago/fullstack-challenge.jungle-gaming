import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn } from 'typeorm'

export enum LogAction {
  CREATE = 'CREATED',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Entity('task_audit_logs')
export class TaskAuditLogs {
  @PrimaryGeneratedColumn('uuid', { name: 'log_id' })
  id!: string

  @Column('uuid', { name: 'task_id' })
  taskId!: string

  @Column('uuid', { name: 'user_id' })
  userId!: string

  @Column('enum', { name: 'log_action',
    enum: LogAction,
  })
  action!: LogAction

  @Column('simple-json', { name: 'log_metadata',
    nullable: true,
  })
  metadata!: any

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}

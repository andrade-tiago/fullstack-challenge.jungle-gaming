import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, 
  Unique } from 'typeorm'
import { Task } from './task.entity'

@Entity('task_assignments')
@Unique(['taskId', 'userId'])
export class TaskAssignment
{
  @PrimaryGeneratedColumn('uuid', { name: 'task_assignment_id' })
  id!: string

  @Column('uuid', { name: 'task_id' })
  taskId!: string

  @Column('uuid', { name: 'user_id' })
  userId!: string

  @ManyToOne(() => Task, task => task.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task!: Task

  @CreateDateColumn({ name: 'created_at' })
  assignedAt!: Date
}

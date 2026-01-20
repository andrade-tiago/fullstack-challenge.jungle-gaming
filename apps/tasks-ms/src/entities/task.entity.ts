import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn, 
  UpdateDateColumn} from 'typeorm'
import { Comment } from './comment.entity'
import { TaskAssignment } from './task-assignment.entity'
import {
  TaskPriority,
  TasksConstants,
  TaskStatus } from '@packages/tasks'

@Entity('tasks')
export class Task
{
  @PrimaryGeneratedColumn('uuid', { name: 'task_id' })
  id!: string
  
  @Column('varchar', { name: 'task_title',
    length: TasksConstants.TASK_TITLE_MAX_LENGTH,
  })
  title!: string

  @Column('varchar', { name: 'task_description',
    length: TasksConstants.TASK_DESCRIPTION_MAX_LENGTH,
  })
  description!: string

  @Column('timestamp', { name: 'task_deadline' })
  deadline!: Date

  @Column('enum', { name: 'task_priority',
    enum: TaskPriority,
    enumName: 'task_priority_enum',
  })
  priority!: TaskPriority

  @Column('enum', { name: 'task_status',
    enum: TaskStatus,
    enumName: 'task_status_enum',
  })
  status!: TaskStatus

  @OneToMany(() => Comment, comment => comment.task)
  comments!: Comment[]

  @OneToMany(() => TaskAssignment, assignment => assignment.task, {
    cascade: true,
  })
  assignments!: TaskAssignment[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './task.entity'
import { CommentsConstants } from '@packages/tasks'

@Entity('comments')
export class Comment
{
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  id!: string

  @Column('uuid', { name: 'user_id' })
  userId!: string

  @Column('uuid', { name: 'task_id' })
  taskId!: string;

  @Column('varchar', { name: 'comment_content',
    length: CommentsConstants.COMMENT_CONTENT_MAX_LENGTH,
  })
  content!: string

  @ManyToOne(() => Task, task => task.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task!: Task

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

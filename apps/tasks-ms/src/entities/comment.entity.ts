import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './task.entity'
import { CommentsContants } from '@packages/tasks'

@Entity('comments')
export class Comment
{
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  id!: string

  @Column('uuid', { name: 'user_id' })
  userId!: string

  @Column('varchar', { name: 'comment_content',
    length: CommentsContants.COMMENT_CONTENT_MAX_LENGTH,
  })
  content!: string

  @ManyToOne(() => Task, task => task.comments)
  task!: Task
}

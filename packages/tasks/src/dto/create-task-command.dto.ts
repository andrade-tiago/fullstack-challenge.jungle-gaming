import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinDate,
  MinLength } from 'class-validator'
import * as TaskConsts from '../constants/tasks.contants'
import { TaskPriority } from '../enums/task-priority.enum'
import { TaskStatus } from '../enums/task-status.enum'

export class CreateTaskCommandDTO {
  @IsString()
  @MinLength(TaskConsts.TASK_TITLE_MIN_LENGTH)
  @MaxLength(TaskConsts.TASK_TITLE_MAX_LENGTH)
  title!: string

  @IsString()
  @MaxLength(TaskConsts.TASK_DESCRIPTION_MAX_LENGTH)
  description!: string

  @Type(() => Date)
  @IsDate()
  @MinDate(() => new Date())
  deadline!: Date

  @IsEnum(TaskPriority)
  priority!: TaskPriority

  @IsEnum(TaskStatus)
  status!: TaskStatus

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  userIds!: string[]
}

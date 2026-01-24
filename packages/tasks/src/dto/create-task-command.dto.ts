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
import { TasksConstants } from '../constants'
import { TaskPriority, TaskStatus } from '../enums'

export class CreateTaskCommandDTO {
  @IsString()
  @MinLength(TasksConstants.TASK_TITLE_MIN_LENGTH)
  @MaxLength(TasksConstants.TASK_TITLE_MAX_LENGTH)
  title!: string

  @IsString()
  @MaxLength(TasksConstants.TASK_DESCRIPTION_MAX_LENGTH)
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

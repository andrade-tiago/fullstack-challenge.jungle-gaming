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
import { ApiProperty } from '@nestjs/swagger'

export class CreateTaskCommandDTO {
  @ApiProperty({
    example: 'Wash the dishes',
    description: 'Title of the task',
  })
  @IsString()
  @MinLength(TasksConstants.TASK_TITLE_MIN_LENGTH)
  @MaxLength(TasksConstants.TASK_TITLE_MAX_LENGTH)
  title!: string

  @ApiProperty({
    example: 'Wash all the dishes as soon as possible.',
    description: 'Detailed description of the task',
  })
  @IsString()
  @MaxLength(TasksConstants.TASK_DESCRIPTION_MAX_LENGTH)
  description!: string

  @ApiProperty({
    example: '2026-06-01',
    description: 'Deadline for task completion',
  })
  @Type(() => Date)
  @IsDate()
  @MinDate(() => new Date())
  deadline!: Date

  @ApiProperty({
    example: TaskPriority.HIGH,
    enum: TaskPriority,
    enumName: 'Task priorities',
    description: 'Priority level of the task',
  })
  @IsEnum(TaskPriority)
  priority!: TaskPriority

  @ApiProperty({
    example: TaskStatus.TODO,
    enum: TaskStatus,
    enumName: 'Task statuses',
    description: 'Status of the task',
  })
  @IsEnum(TaskStatus)
  status!: TaskStatus

  @ApiProperty({
    example: ['900fa0aa-2f5e-4bc4-998c-a87d229c5361'],
    description: 'IDs of users associated with the task',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  userIds!: string[]
}

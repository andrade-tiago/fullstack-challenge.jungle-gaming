import { ApiProperty } from '@nestjs/swagger'
import { CreateTaskCommandDTO } from './create-task-command.dto'
import { TaskPriority, TaskStatus } from '../enums'

const now = new Date()
const nextMonthDate = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
)

export class CreateTaskRequestDTO extends CreateTaskCommandDTO {
  @ApiProperty({
    example: 'Wash the dishes',
    description: 'Title of the task',
  })
  declare title: string

  @ApiProperty({
    example: nextMonthDate.toJSON(),
    description: 'Deadline for task completion',
  })
  declare deadline: Date

  @ApiProperty({
    example: 'Wash all the dishes as soon as possible.',
    description: 'Detailed description of the task',
  })
  declare description: string

  @ApiProperty({
    example: TaskPriority.HIGH,
    enum: TaskPriority,
    enumName: 'Task priorities',
    description: 'Priority level of the task',
  })
  declare priority: TaskPriority

  @ApiProperty({
    example: TaskStatus.TODO,
    enum: TaskStatus,
    enumName: 'Task statuses',
    description: 'Status of the task',
  })
  declare status: TaskStatus

  @ApiProperty({
    example: ['900fa0aa-2f5e-4bc4-998c-a87d229c5361'],
    description: 'IDs of users associated with the task',
  })
  declare userIds: string[]
}

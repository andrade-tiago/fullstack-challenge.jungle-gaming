import { ApiProperty } from '@nestjs/swagger'
import { TaskPriority, TaskStatus } from '../enums'

export class TaskPublicDTO {
  @ApiProperty({
    example: '50a26655-9093-4319-abdc-d48884d2dd66',
  })
  id!: string

  @ApiProperty({
    example: 'Wash the dishes',
  })
  title!: string

  @ApiProperty({
    example: 'Wash all the dishes as soon as possible.',
  })
  description!: string

  @ApiProperty({
    example: '2026-06-01T00:00:00.000Z',
  })
  deadline!: string

  @ApiProperty({
    example: TaskPriority.HIGH,
  })
  priority!: string

  @ApiProperty({
    example: TaskStatus.TODO,
  })
  status!: string
  
  @ApiProperty({
    example: '2026-01-22T06:19:26.659Z',
  })
  createdAt!: string

  @ApiProperty({
    example: '2026-01-22T06:19:26.659Z',
  })
  updatedAt!: string
}
